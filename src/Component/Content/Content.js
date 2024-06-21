import React, { Component } from 'react';
import ReplaceValue from '../../function/ReplaceValue';
import { getConvertText } from '../../function/Firebase';
import { getContentFromFireBase } from '../../function/Firebase';

class Content extends Component {
    textConvert =  () =>{
        var leftTextbox = document.querySelector('.content-left');
        

            var leftContent = leftTextbox.value;
            
            var modifiedContent = this.convertAndFormat(leftContent);
            // console.log(modifiedContent);
            var rightTextbox = document.querySelector('.content-right');
             // begin getcontentFromFirebase
             var convertPath = "/users/user1/kecheng/convert/convert"
             getContentFromFireBase(convertPath)
             .then((data) => {
                 if (data !== null) {
                     var sentences = data.split('\n');
                     console.log(sentences);
                     sentences.forEach(st => {
                        console.log("sentences = " + st);
                        var convert = st.split('=');
                        if (convert.length === 2) {
                            var regex = new RegExp(convert[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
                            console.log(convert[0], convert[1]);
                            modifiedContent = modifiedContent.replace(regex, convert[1]);
                            console.log(modifiedContent);
                            rightTextbox.value = modifiedContent;
                        }
                    });
                 }
                 
             })
             .catch((error) => {
                 console.error("Có lỗi xảy ra:", error);
             });
         // end getcontentFromFirebase
    
            
            rightTextbox.value = modifiedContent;
            // var pinyinText = document.querySelector('.pinyin-left');
            // pinyinText.value = modifiedContent;

           
    }
    convertAndFormat(text) {
        // Sử dụng biểu thức chính quy để tách chuỗi theo các dấu '.', ';', '?', '!'
           var sentences = text.split(/([.!?。？！])\s*/);

           // Tạo lại chuỗi với mỗi câu xuống dòng
           var formattedContent = '';
           for (var i = 0; i < sentences.length; i += 2) {
               formattedContent += sentences[i].trim() + (sentences[i + 1] || '');
               if (i < sentences.length - 2) {
                   formattedContent += '\n';
               }
           }
            formattedContent = ReplaceValue(formattedContent)

       return formattedContent;
       }
    
    pinyinConvert = () =>{
        var pinyinText = document.querySelector('.pinyin-left');
        var pinyinContent = pinyinText.value;
        var pinyinResult = document.querySelector('.pinyin-right');
        pinyinResult.value = ReplaceValue(pinyinContent);
    }
    render() {
        return (
            <div id="content">
                 <i class="menu-icon fa-solid fa-bars" 
                        onClick={this.viewTaskbar}></i>
                <div className="container">
                    <textarea
                    className="left-textbox content-left text-box-height"
                    placeholder="Nội dung cần chuyển đổi"
                    defaultValue={""}
                    />
                    <button id="btn-content" onClick={this.textConvert}>Text Convert</button>
                    <button id="btn-save">
                    <i className="nav-icon ti-download" />
                    </button>
                    <textarea
                    className="right-textbox content-right text-box-height"
                    placeholder="Nội dung sau khi chuyển đổi"
                    defaultValue={""}
                    />
                </div>
                <div className="container">
                    <textarea
                    className="left-textbox pinyin-left text-box-height"
                    placeholder="Pinyin cần chuyển đổi"
                    defaultValue={""}
                    />
                    <button id="btn-pinyin" onClick={this.pinyinConvert}>Pinyin Convert</button>
                    <textarea
                    className="right-textbox pinyin-right text-box-height"
                    placeholder="Pinyin sau khi chuyển đổi"
                    defaultValue={""}
                    />
                </div>
            </div>
        );
    }
}

export default Content;