// 중복 확인은 하지만 등록도 가능해서 수정해야함
// 수정하는 부분에서 저장값들이 변하지 않음 수정
// 전반적으로 jquery를 이용해서 바꿔야함

function Member(id, pw, name) {
    this.userID = id;
    this.userPW = pw;
    this.userName = name;
}

Member.prototype.makeHtml = function () {
    return '[id: '+this.userID+', pw: '+this.userPW+', name: '+this.userName+']'
};

var members = [];

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

    var userID = $('#userID');
    var userPW = $('#userPW');
    var userRepw = $('#userRepw');
    var userName = $('#userName');

    $('#regForm').submit(function(){
        if(userID.val().trim().length < 1){
            $('#userID + .msg').html('필수항목입니다.');
            $('#userID + .msg').css({display : 'block', color : 'red'});
            return false;
        }

        if(userPW.val().trim().length < 1){
            $('#userPW + .msg').html('필수항목입니다.');
            $('#userPW + .msg').css({display : 'block', color : 'red'});
            return false;
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

        // 사용자의 이름 정보
        if(userName.val().trim().length < 1){
            $('#userName + .msg').html('필수항목입니다.');
            $('#userName + .msg').css({display : 'block', color : 'red'});
        }

        $.each(members, function(index,item){
            if($('#userID').val() == members[index].userID){
                alert('중복아이디가 있습니다.');
                return item = false;
            }
        }); 


        members.push(new Member(userID.val(), userPW.val(), userName.val()));

        localStorage.setItem('members', JSON.stringify(members));

        alert('등록되었습니다.');
        console.log('회원 리스트', members);

        this.reset();

        setList();

        return false;
    });

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

    

});

function setList() {
    //table의 tbody 캐스팅
    var list = $('#list');

    var tbody = '<tr>';
    tbody += '<th>순번(index)</th>';
    tbody += '<th>아이디</th>';
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
        for (var i = 0; i<members.length; i++){
            tbody += '<tr>';
            tbody += '  <td>' + i + '</td>';
            tbody += '  <td>' + members[i].userID + '</td>';
            tbody += '  <td>' + members[i].userPW + '</td>';
            tbody += '  <td>' + members[i].userName + '</td>';
            // 자바 스크립트 함수를 불러옴
            tbody += '  <td><a href="javascript:editMember('+i+')">수정</a> | <a href="javascript:deleteMember('+i+')">삭제</td>';
            tbody += '</tr>';
        }
    };
    console.log('hi');

    list.html(tbody);
    
   
}


function deleteMember(index) {
        //alert(index + ' 인덱스의 요소를 삭제합니다.');

        //var chk = confirm('삭제하시겠습니까?');

        // 배열의 index 요소를 삭제
        // splice(index, count) : index에서 시작해서 count 만큼의 요소를 삭제하고 남은 요소의 배열을 반환
        // splice(index, 1)
        if(confirm('삭제하시겠습니까?')){
            members.splice(index, 1);
            alert('삭제되었습니다.');

            // 저장
            localStorage.setItem('members', JSON.stringify(members));

            // 테이블 리스트를 갱신
            setList();
        }

    }

function editMember(index) {

    // 수정 폼 영역이 보여야 한다.
    $('#editFormArea').css('display','block');


    // alert(index + ' 인덱스의 요소를 수정합니다.');

    // 전달받은 인덱스 값으로 members 배열의 객체 하나를 얻을 수 있다.

    console.log(index, members[index]);

    // editForm의 태그들의 value 값을 세팅
    $('#editId').val(members[index].userID);
    $('#editPw').val(members[index].userPW);
    $('#editRepw').val(members[index].userPW);
    $('#editName').val(members[index].userName);
    $('#index').val(index);
    
    $('#editForm').submit(function(){
        // var member = new Member(editId.value, editPw.value, editName.value);
        // console.log(editIndex.value ,member);    

        //  비밀번호와 비밀번호 확인이 같은지 체크
        if (editPw.val() != editRepw.val()) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return false;
        }
        
        if (!confirm('수정하시겠습니까?')) {
            return false;
        }
        
        // 정보 저장
        members[editIndex.val()].userPW = editPw.val();
        members[editIndex.val()].userName = editName.val();

        // 저장소에 저장
        localStorage.setItem('members', JSON.stringify(members));
        
        alert('수정되었습니다.');

        // 테이블 세팅
        setList();

        // 수정 폼 닫기
        $('#editFormArea').css('display','none');

        return false;
    });
    
}

// function editMemberClose() {
//     $('#editFormArea').css('display','none');
// }
