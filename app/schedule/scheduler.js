const isSameDay = require('date-fns/is_same_day');
const isYesterDay = require('date-fns/is_yesterday');
const cron = require('node-cron');


const scheduler = () => {
    const now = new Date();
    cron.schedule('0 0 * * *', async () =>
        go(
            QUERY`SELECT id, apply_start_date, apply_end_date, notice_date, post_start_date, post_end_date, influencer_id FROM campaign`,
            map(async dateData => {
                // 광고주 대기중 -> 진행중
                if (isSameDay(now, dateData.apply_start_date)) {
                    await QUERY`UPDATE campaign SET advertiser_state = 'progress' WHERE id = ${dateData.id}`;
                }

                // 인플런서 신청완료 -> 발표 대기중
                if (isYesterDay(dateData.apply_end_date)) {
                    for (userId in dateData.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"notice_waiting"', true) WHERE id = ${dateData.id} `;
                    }
                }

                // 인플런서 -> 발표 대기중 -> 홍보 진행중
                if (isYesterDay(dateData.notice_date)) {
                    for (userId in dateData.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"posting_progress"', true) WHERE id = ${dateData.id} `;
                    }
                }

                // 광고주, 인플런서 === 완료
                if (isYesterDay(dateData.post_end_date)) {
                    await QUERY`UPDATE campaign SET advertiser_state = 'complete' WHERE id = ${dateData.id}`;
                    for (userId in dateData.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"complete"', true) WHERE id = ${dateData.id} `;
                    }
                }
            })
        )
    )
};


module.exports = scheduler;