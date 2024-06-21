function ReplaceValue(text){
    text = text.replace(/《/g, '「');
    text = text.replace(/》/g, '」');
    text = text.replace(/？/g, '?');
    text = text.replace(/◎ /g, '');
    text = text.replace(/！/g, '!');
    text = text.replace(/。」/g, '」。');
    text = text.replace(/phật/g, 'Phật');
    text = text.replace(/a di đà/g, 'A Di Đà');
    text = text.replace(/di đà/g, 'Di Đà');
    text = text.replace(/như lai/g, 'Như Lai');
    text = text.replace(/vô lượng thọ/g, '"Vô Lượng Thọ"');
    text = text.replace(/Vô lượng thọ/g, '"Vô Lượng Thọ"');
    text = text.replace(/tổ sư đại đức/g, 'Tổ sư Đại đức');
    text = text.replace(/duyến/g, 'duyên');
    text = text.replace(/sa bà/g, 'Sa Bà');
    text = text.replace(/thụy tương/g, 'thụy tướng');
    text = text.replace(/tăng trường/g, 'tăng tưởng');
    text = text.replace(/miễn nan/g, 'miễn nạn');
    text = text.replace(/ thì /g, ' thời ');
    text = text.replace(/ thì /g, ' thời ');
    text = text.replace(/dung dịch/g, 'dung dị');
    text = text.replace(/vu /g, 'ư ');
    text = text.replace(/ứng i /g, 'ứng cai ');
    text = text.replace(/ Một/g, ' một');
    text = text.replace(/o độ/g, 'cao độ');
    text = text.replace(/ ki /g, ' cơ ');
    text = text.replace(/bồ tát/g, 'Bồ Tát');
    text = text.replace(/gian đoạn/g, 'gián đoạn');
    text = text.replace(/đế nhàn/g, 'Đế Nhàn');
    text = text.replace(/Đế nhàn/g, 'Đế Nhàn');
    text = text.replace(/pháp sư/g, 'Pháp sư');
    text = text.replace(/thập ma/g, 'thậm ma');
    text = text.replace(/chích/g, 'chỉ');
    text = text.replace(/yêu/g, 'yếu');
    text = text.replace(/yếu ma/g, 'yêu ma');
    text = text.replace(/đại tàng/g, 'đại tạng');
    text = text.replace(/nhạc/g, 'lạc');
    text = text.replace(/trúng/g, 'trung');
    text = text.replace(/yếu cầu/g, 'yêu cầu');
    text = text.replace(/đại sĩ/g, 'Đại sĩ');
    text = text.replace(/đại đức/g, 'Đại đức');
    text = text.replace(/hập ma/g, 'hậm ma');
    text = text.replace(/xá khí/g, 'xả khí');
    text = text.replace(/xá kỷ/g, 'xả kỷ');
    text = text.replace(/mĩ /g, 'mỹ ');
    text = text.replace(/chúc ư/g, 'thuộc ư');
    text = text.replace(/nhập quan/g, 'nhập quán');
    text = text.replace(/thụ dụng/g, 'thọ dụng');
    text = text.replace(/di lặc/g, 'Di Lặc');
    text = text.replace(/gian thoại/g, 'nhàn Thoại');
    text = text.replace(/a tì/g, 'A Tì');
    text = text.replace(/thiện tông/g, 'Thiền Tông');
    text = text.replace(/thánh nhất/g, 'Thánh Nhất');
    text = text.replace(/thiện đường/g, 'Thiền đường');
    text = text.replace(/ấn quang/g, 'Ấn Quang');
    text = text.replace(/Ấn quang/g, 'Ấn Quang');
    text = text.replace(/luy /g, 'lụy ');
    text = text.replace(/kiền nhiễu/g, 'can nhiễu');
    text = text.replace(/tam bảo/g, 'Tam Bảo');
    text = text.replace(/thiên thai/g, 'Thiên Thai');
    text = text.replace(/viên giáo/g, 'Viên Giáo');
    text = text.replace(/thập tín vị/g, 'Thập Tín Vị');
    text = text.replace(/duyên phân/g, 'duyên phận');
    text = text.replace(/thai loan/g, 'Đài Loan');
    text = text.replace(/đài bắc/g, 'Đài Bắc');
    text = text.replace(/lí tể hoa/g, 'Lí Tể Hoa');
    text = text.replace(/cư sĩ lâm/g, 'Cư Sĩ Lâm');
    text = text.replace(/Cư sĩ lâm/g, 'Cư Sĩ Lâm');
    text = text.replace(/tân gia ba/g, 'Tân Gia Ba');
    text = text.replace(/Tân gia ba/g, 'Tân Gia Ba');
    text = text.replace(/hàn quán trường/g, 'Hàn Quán Trưởng');
    text = text.replace(/Hàn quán trường/g, 'Hàn Quán Trưởng');
    text = text.replace(/lí bỉnh nam/g, 'Lý Bỉnh Nam');
    text = text.replace(/Lí bỉnh nam/g, 'Lý Bỉnh Nam');
    text = text.replace(/lí lão/g, 'Lý lão');
    text = text.replace(/Lí lão/g, 'Lý lão');
    text = text.replace(/liên thai/g, 'Liên Đài');
    text = text.replace(/Liên thai/g, 'Liên Đài');
    text = text.replace(/tao nan/g, 'tao nạn');
    text = text.replace(/liễu phàm/g, 'Liễu Phàm');
    text = text.replace(/viên Liễu Phàm/g, 'Viên Liễu Phàm');
    text = text.replace(/lăng nghiêm/g, 'Lăng Nghiêm');
    text = text.replace(/thượng hải/g, 'Thượng Hải');
    text = text.replace(/đức quốc/g, 'Đức quốc');
    text = text.replace(/tịnh tông/g, 'Tịnh Tông');
    text = text.replace(/\(thượng/g, 'thượng');
    text = text.replace(/tịnh độ/g, 'Tịnh Độ');
    text = text.replace(/kiếp nan/g, 'kiếp nạn');
    text = text.replace(/nhị túc tôn/g, 'Nhị túc tôn');
    text = text.replace(/\?」/g, '」?');
    text = text.replace(/。」/g, '」。');
    text = text.replace(/\(thật/g, 'thật');
    text = text.replace(/đại phạm thiên vương/g, 'Đại Phạm Thiên Vương');
    text = text.replace(/cực lạc/g, 'Cực Lạc');
    text = text.replace(/kì hiện/g, 'thị hiện');
    text = text.replace(/gia tô/g, 'Gia Tô');
    text = text.replace(/Gia tô/g, 'Gia Tô');
    text = text.replace(/cơ đốc/g, 'Cơ Đốc');
    text = text.replace(/Cơ đốc/g, 'Cơ Đốc');
    text = text.replace(/mã lị á/g, 'Mã Lị Á');
    text = text.replace(/y tư lan/g, 'Y Tư Lan');
    text = text.replace(/Y tư lan/g, 'Y Tư Lan');
    text = text.replace(/\(tiêu/g, 'tiêu');
    text = text.replace(/nhiếp thụ/g, 'nhiếp thọ');
    text = text.replace(/nhĩ /g, 'nễ ');
    text = text.replace(/nhĩ./g, 'nễ.');
    text = text.replace(/lí mộc nguyên/g, 'Lý Mộc Nguyên');
    text = text.replace(/Lí mộc nguyên/g, 'Lý Mộc Nguyên');
    text = text.replace(/Phật đà/g, 'Phật Đà');
    text = text.replace(/cầunh/g, 'cầu danh');
    text = text.replace(/đại thừa/g, 'Đại thừa');
    text = text.replace(/phàn duyên/g, 'phan duyên');
    text = text.replace(/Phàn duyên/g, 'Phan duyên');
    text = text.replace(/\(giá/g, 'giá');
    text = text.replace(/\(Giá/g, 'Giá');
    text = text.replace(/tai nan/g, 'tai nạn');
    text = text.replace(/\(bối/g, 'bối');
    text = text.replace(/đức hành/g, 'đức hạnh');
    text = text.replace(/nho /g, 'Nho ');
    text = text.replace(/lục hòa kính/g, 'Lục Hòa Kính');
    text = text.replace(/khổng lão/g, 'Khổng Lão');
    text = text.replace(/phu tử/g, 'Phu Tử');
    text = text.replace(/Hoa nghiêm/g, 'Hoa Nghiêm');
    text = text.replace(/hoa nghiêm/g, 'Hoa Nghiêm');
    text = text.replace(/mạt pháp/g, 'Mạt Pháp');
    text = text.replace(/Mạt pháp/g, 'Mạt Pháp');
    text = text.replace(/tượng pháp/g, 'Tượng Pháp');
    text = text.replace(/chánh pháp/g, 'Chánh Pháp');
    text = text.replace(/kì phạm/g, 'thị phạm');
    text = text.replace(/thế tôn/g, 'Thế Tôn');
    text = text.replace(/Thế tôn/g, 'Thế Tôn');
    text = text.replace(/Bát nhã/g, 'Bát Nhã');
    text = text.replace(/bát nhã/g, 'Bát Nhã');
    text = text.replace(/căn cư/g, 'căn cứ');
    text = text.replace(/chư pháp thật tương/g, 'chư pháp thật tướng');
    text = text.replace(/Chư pháp thật tương/g, 'chư pháp thật tướng');
    text = text.replace(/hình tương/g, 'hình tướng');
    text = text.replace(/định tương/g, 'định tướng');
    text = text.replace(/thân tương/g, 'thân tướng');
    text = text.replace(/Phàm sở hữu tương/g, 'Phàm sở hữu tướng');
    text = text.replace(/soa/g, 'sai');
    text = text.replace(/chính pháp/g, 'chánh pháp');
    text = text.replace(/Chính pháp/g, 'Chánh pháp');
    text = text.replace(/chính lí/g, 'chánh lí');
    text = text.replace(/Chính lí/g, 'Chánh lí');
    text = text.replace(/cú /g, 'câu ');
    text = text.replace(/nhận \(thức/g, 'nhận thức');
    text = text.replace(/đại thánh/g, 'Đại Thánh');
    text = text.replace(/đại hiền/g, 'Đại Hiền');
    text = text.replace(/thánh hiền/g, 'Thánh Hiền');

    // Pinyin area
    text = text.replace(/dē /g,'de ');
    text = text.replace(/dē./g,'de.');
    text = text.replace(/bú /g,'bù ');
    text = text.replace(/ā mí tuó fú/g,'ā mí tuó fó');
    text = text.replace(/yī xīn xiàng fú/g,'yī xīn xiàng fó');
    text = text.replace(/yǐ wèi/g,'yǐ wéi');
    text = text.replace(/kǔ nán/g,'kǔ nàn');
    text = text.replace(/fú hào/g,'fó hào');
    text = text.replace(/fú pú sà/g,'fó pú sà');
    text = text.replace(/xué fú/g,'xué fó');
    text = text.replace(/pí lú zhē nà fú/g,'pí lú zhē nà fó');
    text = text.replace(/fú shuō/g,'fó shuō');
    text = text.replace(/zhí zhe/g,'zhí zhuó');
    text = text.replace(/zhū fú/g,'zhū fó');
    text = text.replace(/chù shì/g,'chǔ shì');
    text = text.replace(/fú gào sù/g,'fó gào sù');
    text = text.replace(/zhǎng shòu/g,'cháng shòu');
    text = text.replace(/zāi nán/g,'zāi nàn');
    text = text.replace(/jié nán/g,'jié nàn');
    text = text.replace(/shì jiā mù ní fó/g,'shì jiā móu ní fó');
    text = text.replace(/chéng wèi/g,'chéng wéi');
    text = text.replace(/zhèng wèi/g,'zhèng wéi');
    text = text.replace(/fú mén/g,'fó mén');
    text = text.replace(/zhe zhòng/g,'Zhuó zhòng');
    text = text.replace(/zhí de/g,'zhí dé');
    text = text.replace(/chēng zhī wèi/g,'chēng zhī wéi');
    text = text.replace(/chēng wèi/g,'chēng wéi');
    text = text.replace(/yí dìng/g,'yī dìng');
    text = text.replace(/tà kāi/g,'tuò kāi');
    text = text.replace(/xíng yè/g,'háng yè'); 
    // text = text.replace(/jué sè/g,'jiǎo sè');
    // 成为
    return text;
}
export default ReplaceValue