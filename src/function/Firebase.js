 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
 // import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
 import { getDatabase, ref, get, set, remove, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
//  import swal from 'sweetalert';

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const ApiKey = process.env.apiKey;
 const authDomain = process.env.authDomain;
 const databaseURL = process.env.databaseURL;
 const projectId = process.env.projectId;
 const storageBucket = process.env.storageBucket;
 const messagingSenderId = process.env.messagingSenderId;
 const appId = process.env.appId;
 const measurementId = process.env.measurementId;
 
 const firebaseConfig = {
   apiKey: "AIzaSyD9IyIValBX6xooTZ3wsBPfKsyYvNwAWik",
   authDomain: "dichchuhan-55a4d.firebaseapp.com",
   databaseURL: "https://dichchuhan-55a4d-default-rtdb.firebaseio.com",
   projectId: "dichchuhan-55a4d",
   storageBucket: "dichchuhan-55a4d.appspot.com",
   messagingSenderId: "589658521880",
   appId: "1:589658521880:web:65694d6b4f17f4ca6b1e6d",
   measurementId: "G-G02KSBMR52"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 // const analytics = getAnalytics(app);
 const db = getDatabase(app);
 const pathToNode = 'users/user1/contents/C1B40'
 const pathTokecheng = 'users/user1/kecheng/C1B40'
 const dataRef = ref(db, '/users/user1/contents/C1B40/C1B40');
 // Đọc dữ liệu từ Firebase
 get(dataRef).then((snapshot) => {
         if (snapshot.exists()) {
             // snapshot.val() chứa dữ liệu bạn muốn
             const data = snapshot.val();
            //  console.log("Dữ liệu từ Firebase:", data);
         } else {
             console.log("Không có dữ liệu tại đường dẫn này.");
         }
     }).catch((error) => {
         console.error("Lỗi khi đọc dữ liệu:", error);
     });

   


// Ghi dữ liệu lên Firebase





function SaveDataToFirebase(){
    var fileList = document.getElementById('fileList');
    var selectedFile = fileList.value;
    var rightTextbox = document.querySelector('.content-right');
    var contentToSave = rightTextbox.value;
    var newData = {
        [selectedFile]: contentToSave
    };
    var kechengPath =   `/users/user1/kecheng/${selectedFile}`
    var translatePath =   `/users/user1/contents/${selectedFile}`
    var dataRef1 = ref(db, translatePath);
    
    set(dataRef1, newData)
    .then(() => {
        console.log("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
        // alert("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
        // swal("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
    })
    .catch((error) => {
        console.error("Lỗi khi ghi dữ liệu bài dịch:", error);
    });


    dataRef1 = ref(db, kechengPath);
    var kechengcontent = document.querySelector('.content-left');
    contentToSave = kechengcontent.value;
    newData = {
        [selectedFile]: contentToSave,
    };
    set(dataRef1, newData)
    .then(() => {
        console.log("Dữ liệu kecheng đã được ghi thành công lên Firebase.");
    })
    .catch((error) => {
        console.error("Lỗi khi ghi dữ liệu kecheng:", error);
    });

};

function CreateNewSection(filename){
    var newSection = filename;
    // var contentToSave = "null";
    var newData = {
        [newSection]: `${newSection} phần dịch`,
    };
    var kechengPath =   `/users/user1/kecheng/${newSection}`
    var translatePath =   `/users/user1/contents/${newSection}`
    var dataRef1 = ref(db, translatePath);
    
    set(dataRef1, newData)
    .then(() => {
        console.log("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
        // alert("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
        // swal("Dữ liệu bài dịch đã được ghi thành công lên Firebase.");
    })
    .catch((error) => {
        console.error("Lỗi khi ghi dữ liệu bài dịch:", error);
    });


    dataRef1 = ref(db, kechengPath);
    // contentToSave = "null";
    newData = {
        [newSection]: `${newSection} 中文`
    };
    set(dataRef1, newData)
    .then(() => {
        console.log("Dữ liệu kecheng đã được ghi thành công lên Firebase.");
    })
    .catch((error) => {
        console.error("Lỗi khi ghi dữ liệu kecheng:", error);
    });

};

async function AddDataToFireBase(path,key,value){
    var dataRef = ref(db, path);
    var data ={
        [key]:value
    }
    try{
        var result= await set(dataRef, data)
        return true;
    }
    catch(error) {
        console.error("Có lỗi xảy ra:", error);
        throw error; 
        return false;
    }
}
async function AddDataToFireBaseNoKey(path,value){
    var dataRef = ref(db, path);
    try{
        var result= await set(dataRef, value)
        return true;
    }
    catch(error) {
        console.error("Có lỗi xảy ra:", error);
        throw error; 
        return false;
    }
}

function DeleteSection(filename){
    var kechengPath =   `/users/user1/kecheng/${filename}`
    var translatePath =   `/users/user1/contents/${filename}`
    // Xóa dữ liệu từ Firebase
    var dataRef1 = ref(db, translatePath);
    remove(dataRef1)
        .then(() => {
            console.log("Dữ liệu bài dịch đã được xóa thành công từ Firebase.");
        })
        .catch((error) => {
            console.error("Lỗi khi xóa dữ liệu bài dịch:", error);
        });

    dataRef1 = ref(db, kechengPath);
    remove(dataRef1)
        .then(() => {
            console.log("Dữ liệu kecheng đã được xóa thành công từ Firebase.");
        })
        .catch((error) => {
            console.error("Lỗi khi xóa dữ liệu kecheng:", error);
        });

};

var path = 'users';
// SelectFile
// Hàm được gọi khi chọn một tệp từ combobox
function loadSelectedFile() {
    // Lấy thẻ combobox và giá trị được chọn
    var fileList = document.getElementById('fileList');
    var selectedFile = fileList.value;
    var kechengPath =   `/users/user1/kecheng/${selectedFile}/${selectedFile}`
    var translatePath =   `/users/user1/contents/${selectedFile}/${selectedFile}`

    console.log(kechengPath);
    console.log( getContentFromFireBase(translatePath));
    getContentFromFireBase(translatePath)
        .then((data) => {
            if (data !== null) {
                // Hiển thị dữ liệu trong right-textbox
                document.querySelector('.content-right').value = data;
            }
        })
        .catch((error) => {
            console.error("Có lỗi xảy ra:", error);
    });

    getContentFromFireBase(kechengPath)
    .then((data) => {
        if (data !== null) {
            // Hiển thị dữ liệu trong right-textbox
            document.querySelector('.content-left').value = data;
        }
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
    });

}

function getConvertText(){
    var convertPath = "/users/user1/kecheng/convert/convert"
    getContentFromFireBase(convertPath)
    .then((data) => {
        
        return data
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
        return null
    });
    
}
function loadInputFile(selectedFile) {
    
    var kechengPath =   `/users/user1/kecheng/${selectedFile}/${selectedFile}`
    var translatePath =   `/users/user1/contents/${selectedFile}/${selectedFile}`
    var fileList = document.getElementById('fileList');
    fileList.value = selectedFile;
    
    getContentFromFireBase(translatePath)
        .then((data) => {
            if (data !== null) {
                // Hiển thị dữ liệu trong right-textbox
                document.querySelector('.content-right').value = data;
            }
        })
        .catch((error) => {
            console.error("Có lỗi xảy ra:", error);
    });

    getContentFromFireBase(kechengPath)
    .then((data) => {
        if (data !== null) {
            // Hiển thị dữ liệu trong right-textbox
            document.querySelector('.content-left').value = data;
        }
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
    });

}
function getContentFromFireBase(path){
    return new Promise((resolve, reject) => {
        // Đọc dữ liệu từ Firebase
        var dataRef = ref(db, path);
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                resolve(data);
            } else {
                console.log("Không có dữ liệu tại đường dẫn này.");
                resolve(null);
            }
        }).catch((error) => {
            console.error("Lỗi khi đọc dữ liệu:", error);
            reject(error);
        });
    });
   
}  

const pathToContents = 'users/user1/contents';

// Hàm để đọc dữ liệu từ Firebase
async function loadFileList() {
    const contentsRef = ref(db, pathToContents);
    const contentsSnapshot = await get(contentsRef);
    console.log("ApiKey"+ApiKey);
    if (contentsSnapshot.exists()) {
        const fileList = Object.keys(contentsSnapshot.val());
        updateFileListDropdown(fileList);
        loadSelectedFile();
    } else {
        console.log("Không có dữ liệu tại đường dẫn này.");
    }
}

//Hàm hiển thị file vừa khởi tạo
async function ShowNewFile(newfilename) {
    const contentsRef = ref(db, pathToContents);
    const contentsSnapshot = await get(contentsRef);

    if (contentsSnapshot.exists()) {
        const fileList = Object.keys(contentsSnapshot.val());
        updateFileListDropdown(fileList);
        loadInputFile(newfilename);
    } else {
        console.log("Không có dữ liệu tại đường dẫn này.");
    }
}
// Hàm để cập nhật combobox "fileList"
function updateFileListDropdown(fileList) {
    const fileListDropdown = document.getElementById("fileList");

    // Xóa các phần tử hiện tại trong combobox
    while (fileListDropdown.firstChild) {
        fileListDropdown.removeChild(fileListDropdown.firstChild);
    }

    // Thêm các tùy chọn mới từ danh sách file
    fileList.forEach((filename) => {
        const option = document.createElement("option");
        option.value = filename;
        option.textContent = filename;
        fileListDropdown.appendChild(option);
    });
}

export { loadFileList };

document.addEventListener('DOMContentLoaded', () => {
    loadFileList();
});
// End Load FileList

export { SaveDataToFirebase };
export { CreateNewSection };
export { DeleteSection };
export { ShowNewFile };
export {loadSelectedFile};
export {getConvertText};
export {getContentFromFireBase};
export {AddDataToFireBase}
export {AddDataToFireBaseNoKey}




