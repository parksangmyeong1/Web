
// 전반적으로 jquery를 이용해서 바꿔야함

// member 생성자 함수 정의
function Member(id, pw, name) {
    this.userID = id;
    this.userPW = pw;
    this.userName = name;
}

// 객체가 가지는 메소드는 공통으로 사용 -> prototype
Member.prototype.makeHtml = function () {
    return '[id: '+this.userID+', pw: '+this.userPW+', name: '+this.userName+']'
};

// members 배열 : 회원의 정보를 저장
var members = [];

// 시작
$(document).ready(function(){

    if (localStorage.getItem('members') == null) {
        // 배열 members를 저장
        localStorage.setItem('members',JSON.stringify(members));
    } else {
        members = JSON.parse(localStorage.getItem('members')); // JSON 문자열
        console.log(members);

        // 테이블 세팅
        setList();
    }

    // 수정 폼 닫기
    $('#close').click(function(){
        $('#editFormArea').css('display','none');
    });

    // 수정 폼 닫기 hover
    $('#close').hover(function(){
        $(this).css({color : 'lightcyan', background : 'black'});
    }, function(){
        $(this).css({color : 'black', background : 'lightcyan'});
    });

    // userInfo 캐스팅
    var userID = $('#userID');
    var userPW = $('#userPW');
    var userRepw = $('#userRepw');
    var userName = $('#userName');

    // regForm submit
    $('#regForm').submit(function(){
        
        // userInfo insert check
        if(userID.val().trim().length < 1){
            $('#userID + .msg').html('필수항목입니다.');
            $('#userID + .msg').css({display : 'block', color : 'red'});
            return false;
        }
        else{
            if(!isId(userID.val())){
                $('#userID + .msg').html('영문 대 소문자, 숫자를 사용해주세요');
                $('#userID + .msg').css({display : 'block', color : 'red'});
                return false;
            };
        }

        if(userPW.val().trim().length < 1){
            $('#userPW + .msg').html('필수항목입니다.');
            $('#userPW + .msg').css({display : 'block', color : 'red'});
            return false;
        }else{
            if(!isPassword(userPW.val())){
                $('#userPW + .msg').html('4~12자 영문 대 소문자, 숫자를 사용해주세요');
                $('#userPW + .msg').css({display : 'block', color : 'red'});
                return false;
            }
        }

        if(userRepw.val().trim().length < 1){
            $('#userRepw + .msg').html('필수항목입니다.');
            $('#userRepw + .msg').css({display : 'block', color : 'red'});
            return false;
        }

        // 비밀번호 비밀번호 확인 일치 여부 체크
        if(!(userPW.val().trim() == userRepw.val().trim())){
            $('#userRepw + .msg').html('비밀번호가 일치하지 않습니다.');
            $('#userRepw + .msg').css({display : 'block', color : 'red'});
            return false;
        }

        if(userName.val().trim().length < 1){
            $('#userName + .msg').html('필수항목입니다.');
            $('#userName + .msg').css({display : 'block', color : 'red'});
            return false;
        }else{
            if(!isName(userName.val())){
                $('#userName + .msg').html('2~12자 영문 대 소문자, 한글을 사용해주세요');
                $('#userName + .msg').css({display : 'block', color : 'red'});
                return false;
            }
        }

        // 아이디 중복 체크
        for (var i = 0; i < members.length; i++){
            if (userID.val() == members[i].userID) {
                alert('이미 사용중인 아이디입니다.');
                return false;
            }
        }

        // members 배열에 정보 추가
        members.push(new Member(userID.val(), userPW.val(), userName.val()));

        // localStorage에 members 저장
        localStorage.setItem('members', JSON.stringify(members));

        alert('등록되었습니다.');
        console.log('회원 리스트', members);

        // form 초기화
        this.reset();

        // 테이블 세팅
        setList();

        return false;
    });

    // focus : div.msg 없애주기
    $('#userID').focus(function(){
        $('userID+.msg').css({display : 'none'});
        $('#userID+.msg').html('')
    });
    $('#userPW').focus(function(){
        $('userPW+.msg').css({display : 'none'});
        $('#userPW+.msg').html('')
    });
    $('#userRepw').focus(function(){
        $('userRepw+.msg').css({display : 'none'});
        $('#userRepw+.msg').html('')
    });
    $('#userName').focus(function(){
        $('userName+.msg').css({display : 'none'});
        $('#userName+.msg').html('')
    });

    // 수정 폼에서 editForm submit
    $('#editForm').submit(function(){    
 
        //  비밀번호와 비밀번호 확인이 같은지 체크
        if ($('#editPw').val() != $('#editRepw').val()) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return false;
        }
        
        // 수정할 건지 체크
        if (!confirm('수정하시겠습니까?')) {
            return false;
        }
        
        // 정보 저장
        members[$('#index').val()].userPW = $('#editPw').val();
        members[$('#index').val()].userName = $('#editName').val();

        // 저장소에 저장
        localStorage.setItem('members', JSON.stringify(members));
        
        alert('수정되었습니다.');

        // 테이블 세팅
        setList();

        // 수정 폼 닫기
        $('#editFormArea').css('display','none');

        return false;
    });

});
// userID 정규식 함수 : 이메일 형식
function isId(string){
    var regExp = /\w+@\w+\.\w/ig;
    return regExp.test(string);
};
// userPw 정규식 함수 : 영어, 숫자로 이루어짐 4-12글자
function isPassword(string){
    var regExp = /^[A-Za-z0-9]{4,12}$/ig;
    return regExp.test(string);
}
// userName 정규식 함수 : 영어, 한글로 이루어짐 2-12글자
function isName(string){
    var regExp = /^[A-Za-z가-힇]{2,12}$/ig;
    return regExp.test(string);
}

// 테이블 세팅 함수
function setList() {

    var tbody = '<tr>';
    tbody += '<th>순번(index)</th>';
    tbody += '<th>아이디(이메일)</th>';
    tbody += '<th>비밀번호</th>';
    tbody += '<th>이름</th>';
    tbody += '<th>관리</th>';
    tbody += '</tr>';
    
    
    // 데이터 없을 경우
    if (members.length < 1) {
        tbody += '<tr>';
        tbody += '<td colspan=5>데이터가 존재하지 않습니다.</td>';
        tbody += '</tr>';

    } else {
        $.each(members, function(index){
            tbody += '<tr>';
            tbody += '  <td>' + index + '</td>';
            tbody += '  <td>' + members[index].userID + '</td>';
            tbody += '  <td>' + members[index].userPW + '</td>';
            tbody += '  <td>' + members[index].userName + '</td>';
            // 자바 스크립트 함수를 불러옴
            tbody += '  <td><a href="javascript:editMember('+index+')">수정</a> | <a href="javascript:deleteMember('+index+')">삭제</td>';
            tbody += '</tr>';
        })
    };

    $('#list').html(tbody);
}

// 삭제 함수
function deleteMember(index) {
        
        if(confirm('삭제하시겠습니까?')){
            members.splice(index, 1);
            alert('삭제되었습니다.');

            // 저장
            localStorage.setItem('members', JSON.stringify(members));

            // 테이블 리스트를 갱신
            setList();
        }

    }

// 수정 함수
function editMember(index) {

    // 수정 폼 영역이 보여야 한다.
    $('#editFormArea').css('display','block');

    // editForm에 value 값을 세팅
    $('#editId').val(members[index].userID);
    $('#editPw').val(members[index].userPW);
    $('#editRepw').val(members[index].userPW);
    $('#editName').val(members[index].userName);
    $('#index').val(index);
}