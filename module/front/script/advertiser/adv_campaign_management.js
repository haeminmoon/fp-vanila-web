<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Vanila-web based FP</title>
        <link rel="stylesheet" href="/front/css/common.css"> 
        
    <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
    <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_management.css" />

    </head>
    <body>
        
    
<div id="nav">
    <h1 class="logo">
        <a href="/">
            <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%403x.png" class="logo" alt="spinprotocol_logo">
        </a>
    </h1>
    <div class="profile">
        <div class="image">
            <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
        </div>
        <p class="user_name">회사명</p>
    </div>
    <ul class="nav_gnb">
        <li class="nav_on"><a href="/advertiser/adv_campaign_management">캠페인 관리</a></li>
        <li><a href="/advertiser/adv_campaign_registration">캠페인 등록</a></li>
        <li><a href="/advertiser/adv_influencer_list">인플루언서 리스트</a></li> 
        <li class="setting"><a href="/advertiser/adv_my_info">설정</a></li>
    </ul>
    <div class="logout_btn_wrap">
        <a class="logout_btn" href="/common/signout">로그아웃</a>
    </div>
</div>


    
<div id="header">
<ul class="header_gnb">
    <li class="notice_icon">
        <button type="button" class="notice_msg">
            <div class="circle_cnt">1</div>
            <img class="gnb_icon" src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/notice_icon/baseline-search-24-px-copy.svg" alt="notice icon">
        </button>
    </li>
    <li class="header_profile_img">
        <div class="header_img">
            <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
        </div>
    </li>
    <li>
        <p>회사명님</p>
    </li>
</ul>
</div>

    
    <div id="main">
        <div class="container">
            <div class="breadcrumbs">
                <a href="/">홈</a>
                <a href="/advertiser/adv_campaign_management">캠페인 리스트</a>
            </div>
            <div class="state_wrap">
                <h2 class="hide">전체 프로세스</h2>
                <ul class="state_box">
                    <li>
                        <a>
                            <span class="state">전체</span>
                            <span class="state_all"></span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span class="state">대기중</span>
                            <span class="state_wait"></span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span class="state">진행중</span>
                            <span class="state_progress"></span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span class="state">완료</span>
                            <span class="state_complete"></span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="search_wrap">
                <h2>상세검색</h2>
                <div class="search_word">
                    <span>검색어</span>
                    <div class="search_inbox">
                        <input type="text" name="search_txt" class="search_txt" placeholder="인플루언서 계정(아이디), 상품명, 검색어, 상품번호, 브랜드, 제조사, 상품 브랜드">
                        <button type="button" class="search_icon"></button>
                    </div>
                </div>
                <div class="search_check">
                    <span>판매상태</span>
                    <div class="check_box">
                        <div class="check_tab">
                            <input type="checkbox" name="sale_chk" id="wait" value="wait" class="checkbox">
                            <label for="wait">대기중</label>
                        </div>
                        <div class="check_tab">
                            <input type="checkbox" name="sale_chk" id="progress" value="progress" class="checkbox">
                            <label for="progress">진행중</label>
                        </div>
                        <div class="check_tab">
                            <input type="checkbox" name="sale_chk" id="sale_complete" value="sale_complete" class="checkbox">
                            <label for="sale_complete">판매완료</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list_wrap">
                <h2>캠페인 리스트</h2>
                <table class="camp_table">
                    <caption>캠페인 리스트 등록안내 게시판</caption>
                    <thead>
                        <tr>
                            <th scope="col" class="num">NO</th>
                            <th scope="col" class="campaign_name">캠페인 명</th>
                            <th scope="col" class="apply_term">신청기간</th>
                            <th scope="col" class="apply_count ud">신청인원</th>
                            <th scope="col" class="start_date">캠페인 등록일</th>
                            <th scope="col" class="camp_state ud">상태</th>
                        </tr>
                    </thead>
                    <tbody class="camp_list">
                    </tbody>
                </table>
            </div>
        </div>
    </div>