import React, { Component } from 'react';
import ReplaceValue from '../../function/ReplaceValue';
import { getConvertText } from '../../function/Firebase';
import { getContentFromFireBase } from '../../function/Firebase';
import { Button } from 'react-bootstrap';

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
       
        var newText = ReplaceValue(pinyinContent);
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
                       newText = newText.replace(regex, convert[1]);
                       console.log(newText);
                       pinyinResult.value = newText;
                   }
               });
            }
            
        })
        .catch((error) => {
            console.error("Có lỗi xảy ra:", error);
        });
    // end getcontentFromFirebase

    pinyinResult.value = newText;
    }
    convertFromFirebase = (text) =>{
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
                        text = text.replace(regex, convert[1]);
                        return text
                    }
                });
            }
            
        })
        .catch((error) => {
            console.error("Có lỗi xảy ra:", error);
            return "convert errors";
        });
        // end getcontentFromFirebase
    }
    render() {
        return (
            <div id="content">
                <div className='btnMenuSide'>
                {/* <Button variant="danger" onClick={this.props.menuOnClick}>
                            <i class="fa-solid fa-bars" ></i>
                            </Button> */}
                <h2>Convert Text</h2>
                </div>
                
                <div className="container1">
                    <div className='row' style={{width:'100%'}}>
                        <div className='col-5' style={{padding:'0'}}>
                            <textarea
                            className="left-textbox content-left text-box-height"
                            placeholder="Nội dung cần chuyển đổi"
                            defaultValue={""}
                            />
                        </div>

                        <div className='col-2' style={{padding:'0'}}>
                            <div className='btnConvert'>
                            {/* <button id="btn-content" onClick={this.textConvert}>Text Convert</button> */}
                            <Button id="btn-content" variant="warning" onClick={this.textConvert}>
                            Text Convert
                            </Button>
                        {/* <button id="btn-save">
                        <i className="nav-icon ti-download" />
                        </button> */}
                            </div>
                            
                        </div>

                        <div className='col-5' style={{padding:'0'}}>
                            <textarea
                            className="right-textbox content-right text-box-height"
                            placeholder="Nội dung sau khi chuyển đổi"
                            defaultValue={""}
                            />
                        </div>
                    </div>
                </div>

                <div className="container1">
                    <div className='row' style={{width:'100%'}}>
                        <div className='col-5' style={{padding:'0'}}>
                            <textarea
                            className="left-textbox pinyin-left text-box-height"
                            placeholder="Pinyin cần chuyển đổi"
                            defaultValue={""}
                            />
                        </div>

                        <div className='col-2' style={{padding:'0'}}>
                            <div className='btnConvert'>
                            <Button id="btn-pinyin" variant="warning"  onClick={this.pinyinConvert}>
                            Pinyin Convert
                            </Button>
                            </div>
                            
                        </div>

                        <div className='col-5' style={{padding:'0'}}>
                            <textarea
                            className="right-textbox pinyin-right text-box-height"
                            placeholder="Pinyin sau khi chuyển đổi"
                            defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;