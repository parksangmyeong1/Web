// 회원의 정보 : 아이디, 비밀번호, 이름
// Member -> 생성자 함수를 정의
function Member(id, pw, name) {
    this.userID = id;
    this.userPW = pw;
    this.userName = name;
}
// 객체가 가지는 메소드는 공통으로 사용 -> prototype
Member.prototype.makeHtml = function () {
    return '[id: '+this.userID+', pw: '+this.userPW+', name: '+this.userName+']'
};
////////////////////////////////////////////////////////////////////////////////////

// 회원의 정보를 저장하는 배열
var members = [];   // new Array()

// 배열 -> JSON(문자열) -> localStorage 저장
// 저장
// 수정
// 삭제
// setItem('members',JSON.stringify(members))

////////////////////////////////////////////////////////////////////////////////////

// 사용자 입력한 정보를 가지고 Member객체를 생성
// submit 이벤트 연결

window.onload = function () {

    // localStorage에 저장된 데이터가 있는지 확인
    // localStorage에 members가 없으면 null 반환
    if (localStorage.getItem('members') == null) {
        // 배열 members를 저장
        localStorage.setItem('members',JSON.stringify(members));
    } else {
        members = JSON.parse(localStorage.getItem('members')); // JSON 문자열
        console.log(members);

        // 테이블 세팅
        setList();
    }

    // 사용자가 입력한 값
    var userID = document.querySelector('#userID');
    var userPW = document.querySelector('#userPW');
    var userRepw = document.querySelector('#userRepw');
    var userName = document.querySelector('#userName');

    // regForm 캐스팅
    var regForm = document.getElementById('regForm');

    
    regForm.onsubmit = function () {
        
        // trim : 좌우 입력 공백을 없애준다.
        if (userID.value.trim().length<1) {
            // alert('아이디를 입력해주세요.');
            document.querySelector('#userID+div.msg').innerHTML = '필수항목입니다.';
            document.querySelector('#userID+div.msg').style.display = 'block';
            document.querySelector('#userID+div.msg').style.color = 'red';
            return false;
        }

        if (userPW.value.trim().length < 1) {
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
        if (!(userPW.value.trim() == userRepw.value.trim())) {
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

        // 중복 아이디 체크
        for (var i = 0; i < members.length; i++){
            if (userID.value == members[i].userID) {
                alert('중복아이디가 있습니다.');
                return false;
            }
        }

        // console.log(userID.value, userPW.value, userRepw.value, userName.value);

        // 받아온 입력 값으로 member 객체 생성
        // var member = new Member(userID, userPW, userName);
        // console.log(typeof member, member);
        
        // 배열에 사용자 정보를 추가
        members.push(new Member(userID.value, userPW.value, userName.value));

        // 저장
        localStorage.setItem('members', JSON.stringify(members));
        
        alert('등록되었습니다.');
        console.log('회원 리스트', members);

        // form 초기화
        this.reset();
        
        // 테이블 세팅
        setList();
        
        // 브라우저 안에서 해결하기 때문에 보낼 필요 없다.
        return false;
    }
    // focus : div.msg 없애주기
    userID.addEventListener('focus', function () {
        document.querySelector('#userID+div.msg').style.display = 'none';
        document.querySelector('#userID+div.msg').innerHTML = '';
    });
    userPW.addEventListener('focus', function () {
        document.querySelector('#userPW+div.msg').style.display = 'none';
        document.querySelector('#userPW+div.msg').innerHTML = '';
    });
    userRepw.addEventListener('focus', function () {
        document.querySelector('#userRepw+div.msg').style.display = 'none';
        document.querySelector('#userRepw+div.msg').innerHTML = '';
        userRepw.value = '';
    });
    userName.addEventListener('focus', function () {
        document.querySelector('#userName+div.msg').style.display = 'none';
        document.querySelector('#userName+div.msg').innerHTML = '';
    });
    

}

// 배열에 있는 요소를 -> 테이블에 tr 행을 만들어서 추가
function setList() {
    //table의 tbody 캐스팅
    var list = document.querySelector('#list');

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

    list.innerHTML = tbody;
    
   
}

// 배열의 요소 삭제 함수
function deleteMember(index){
    // alert(index + ' 인덱스의 요소를 삭제합니다.');
    
    // var chk = confirm('삭제하시겠습니까?');
    
    // 배열의 index 요소를 삭제
    // splice(index, count) : index에서 시작해서 count 만큼의 요소를 삭제하고,
    // 남은 요소의 배열을 반환
    // splice(index, 1)
    if (confirm('삭제하시겠습니까?')) {
        members.splice(index, 1);
        alert('삭제되었습니다.');
        
        //저장
        localStorage.setItem('members',JSON.stringify(members));

        // 테이블 리스트를 갱신
        setList();
    }
    
}

// 배열의 요소 수정 함수
function editMember(index) {

    // 수정 폼 영역이 보여야 한다.
    document.querySelector('#editFormArea').style.display = 'block';


    // alert(index + ' 인덱스의 요소를 수정합니다.');

    // 전달받은 인덱스 값으로 members 배열의 객체 하나를 얻을 수 있다.

    console.log(index, members[index]);

    // editForm의 태그들의 value 값을 세팅
    var editId = document.querySelector('#editId');
    var editPw = document.querySelector('#editPw');
    var editRepw = document.querySelector('#editRepw');
    var editName = document.querySelector('#editName');
    var editIndex = document.querySelector('#index');
   
    // 이전 데이터를 수정 폼에 세팅
    editId.value = members[index].userID;
    editPw.value = members[index].userPW;
    editRepw.value = members[index].userPW;
    editName.value = members[index].userName;
    editIndex.value = index;

    document.querySelector('#editForm').onsubmit = function () {
        
        // var member = new Member(editId.value, editPw.value, editName.value);
        // console.log(editIndex.value ,member);    

        //  비밀번호와 비밀번호 확인이 같은지 체크
        if (editPw.value != editRepw.value) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return false;
        }
        
        if (!confirm('수정하시겠습니까?')) {
            return false;
        }
        
        // 정보 저장
        members[editIndex.value].userPW = editPw.value;
        members[editIndex.value].userName = editName.value;

        // 저장소에 저장
        localStorage.setItem('members', JSON.stringify(members));
        
        alert('수정되었습니다.');

        // 테이블 세팅
        setList();

        // 수정 폼 닫기
        editMemberClose();

        return false;
    }
    
}

function editMemberClose() {
    document.querySelector('#editFormArea').style.display = 'none';
}