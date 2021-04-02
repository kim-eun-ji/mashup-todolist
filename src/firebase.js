import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyDaScKXHQxybIl9WoOX_VyBTn8x0jxqafU",
    authDomain: "mashup-todolist.firebaseapp.com",
    databaseURL: "https://mashup-todolist-default-rtdb.firebaseio.com",
    projectId: "mashup-todolist",
    storageBucket: "mashup-todolist.appspot.com",
    messagingSenderId: "156249375326",
    appId: "1:156249375326:web:8c681d9d37ae3786cdaacf",
    measurementId: "G-DGGKRGV1GG"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };