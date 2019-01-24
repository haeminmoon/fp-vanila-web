const isSameDay = require('date-fns/is_same_day');
const isYesterDay = require('date-fns/is_yesterday');
const cron = require('node-cron');
const { sendMail } = require('../../module/back/util/mailer');


const scheduler = () => {
    const now = new Date();
    cron.schedule('0 0 * * *', async () =>
        go(
            QUERY`SELECT * FROM campaign`,
            map(async campaign => {
                // 광고주 대기중 -> 진행중
                if (isSameDay(now, campaign.apply_start_date)) {
                    await QUERY`UPDATE campaign SET advertiser_state = 'progress' WHERE id = ${campaign.id}`;
                }

                // 켐페인 발표일 - 알림
                if (isSameDay(now, campaign.notice_date)) {
                    await sendMail(
                        '스핀 프로토콜에서 보내는 메일입니다',
                        `등록하신 ${campaign.name} 켐페인의 발표날입니다.`,
                        campaign.advertiser_id).catch(err => log(err));

                    Object.keys(campaign.influencer_id).map(async (inf_id) => {
                        await sendMail(
                            '스핀 프로토콜에서 보내는 메일입니다',
                            `신청하신 ${campaign.name} 켐페인의 발표날입니다.`,
                            inf_id).catch(err => log(err));
                    })
                }

                // 인플런서 신청완료 -> 발표 대기중
                if (isYesterDay(campaign.apply_end_date)) {
                    for (userId in campaign.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"notice_waiting"', true) WHERE id = ${campaign.id} `;
                    }
                }

                // 인플런서 -> 발표 대기중 -> 홍보 진행중
                if (isYesterDay(campaign.notice_date)) {
                    for (userId in campaign.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"posting_progress"', true) WHERE id = ${campaign.id} `;
                    }
                }

                // 광고주, 인플런서 === 완료 상태 , 알림
                if (isYesterDay(campaign.post_end_date)) {
                    await sendMail(
                        '스핀 프로토콜에서 보내는 메일입니다',
                        `등록하신 ${campaign.name} 켐페인이 마감되었습니다.`,
                        campaign.advertiser_id).catch(err => log(err));

                    Object.keys(campaign.influencer_id).map(async (inf_id) => {
                        await sendMail(
                            '스핀 프로토콜에서 보내는 메일입니다',
                            `포스팅하신 ${campaign.name} 켐페인이 마감되었습니다.`,
                            inf_id).catch(err => log(err));
                    });

                    await QUERY`UPDATE campaign SET advertiser_state = 'complete' WHERE id = ${campaign.id}`;
                    for (userId in campaign.influencer_id) {
                        const stateObj = `{"${userId}", "state"}`;
                        await QUERY`UPDATE campaign SET "influencer_id" = jsonb_set("influencer_id", ${stateObj}, '"complete"', true) WHERE id = ${campaign.id} `;
                    }
                }
            })
        )
    )
};


module.exports = scheduler;