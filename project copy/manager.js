function Member(id, pw, name) {
    this.userID = id;
    this.userPW = pw;
    this.userName = name;
}

var members = [];

window.onload = function () {

    var userId = document.querySelector('#userID');
    var userPw = document.querySelector('#userPW');
    var userRepw = document.querySelector('#userRepw');
    var userName = document.querySelector('#userName');

    var regForm = document.getElementById('regForm');

    regForm.onsubmit = function () {
        if (userId.value.trim().length<1) {
            // alert('아이디를 입력해주세요.');
            document.querySelector('#userID+div.msg').innerHTML = '필수항목입니다.';
            document.querySelector('#userID+div.msg').style.display = 'block';
            document.querySelector('#userID+div.msg').style.color = 'red';
            return false;
        }

        if (userPw.value.trim().length < 1) {
            // alert('비밀번호를 입력해주세요.');
            document.querySelector('#userPW+div.msg').innerHTML = '필수항목입니다.';
            document.querySelector('#userPW+div.msg').style.display = 'block';
            document.querySelector('#userPW+div.msg').style.color = 'red';
            return false;
            
        }

        if (userRepw.value.trim().length < 1) {
            // alert('비밀번호를 입력해주세요.');
            document.querySelector('#userRepw+div.msg').innerHTML = '필수항목입니다.';
            document.querySelector('#userRepw+div.msg').style.display = 'block';
            document.querySelector('#userRepw+div.msg').style.color = 'red';
            return false;            
        }

        // 비밀번호와 비밀번호 확인 일치 여부 체크
        if (!(userPw.value.trim() == userRepw.value.trim())) {
            // alert('비밀번호와 비밀번호 확인과 일치하지 않습니다.\n 다시 확인해주세요.');
            document.querySelector('#userRepw+div.msg').innerHTML = '비밀번호가 일치하지 않습니다.';
            document.querySelector('#userRepw+div.msg').style.display = 'block';
            document.querySelector('#userRepw+div.msg').style.color = 'red';
            return false;
        }
        
        if (userName.value.trim().length < 1) {
            // alert('이름을 입력해주세요.');
            document.querySelector('#userName+div.msg').innerHTML = '필수항목입니다.';
            document.querySelector('#userName+div.msg').style.display = 'block';
            document.querySelector('#userName+div.msg').style.color = 'red';
            return false;
        }  
        
        members.push(new Member(userId, userPw, userName));

        alert('등록되었습니다.');
        console.log('회원 리스트', members);

        return false;
    }
    userId.addEventListener('focus', function () {
        // focus : div.msg 없애주기
        document.querySelector('#userID+div.msg').style.display = 'none';
        document.querySelector('#userID+div.msg').innerHTML = '';
    });
    userPw.addEventListener('focus', function () {
        // focus : div.msg 없애주기
        document.querySelector('#userPW+div.msg').style.display = 'none';
        document.querySelector('#userPW+div.msg').innerHTML = '';
    });
    userRepw.addEventListener('focus', function () {
        // focus : div.msg 없애주기
        document.querySelector('#userRepw+div.msg').style.display = 'none';
        document.querySelector('#userRepw+div.msg').innerHTML = '';
    });
    userName.addEventListener('focus', function () {
        // focus : div.msg 없애주기
        document.querySelector('#userName+div.msg').style.display = 'none';
        document.querySelector('#userName+div.msg').innerHTML = '';
    });
    
}