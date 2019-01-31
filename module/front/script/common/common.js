// const nav = document.querySelectorAll('.nav_gnb > li');

// for (let i = 0; i < nav.length; i++) {
//     nav[i].addEventListener('click', function (e) {
//         nav[i].classList.remove("nav_on");
//         e.target.classList.add("nav_on");
//     });
// }

const clickNoticeMsg = userId => {
    // alert(userId);
    if (!$('.notification').classList[1]) $('.notification').classList.add("hidden")
    else {
        go(
            {"id" : userId},
            $.post('/api/notification'),
            a => match(a.res)
                .case(b => b === "there is no contents")(_ => $('.notification').innerHTML = "<p>알림이 없습니다</p>")
                .case(b => b === "successful load notification")(_ => $('.notification_contents').innerHTML = a.contents)
                .else(_ => alert("서버 에러입니다"))
        )
        $('.notification').classList.remove("hidden");
    }
    return;
}