<template>
  <div class="outdiv">
    <div class="score-wrappers">
        <div class="squary">
            <form action="" method="get">
                <label><input name="Fruit" type="checkbox" value="" /><span>机器损坏</span></label>
                <label><input name="Fruit" type="checkbox" value="" />机器故障</label>
            </form>
        </div>
        <div class="squarys">
            <p>上传照片：</p>
            <div class="uploader-box uploader-plus">
                <input id="uploader_input" class="uploader-input" accept="image/*" multiple="" type="file">
            </div>
        </div>
        <div class="squaryss">
            <form action="" method="get">
                <label><input name="Fruit" type="textarea" value="" placeholder="请简单描述问题（限30字）" style="border: none"/></label>
            </form>
        </div>
        <div class="btn">
            <button class="yjbx_button">报 修</button>
        </div>
    </div>
  </div>

</template>
<style scoped>
@import "../../style/common.css";
</style>

<script src="../js/common.js"></script>
<script type="text/javascript" src="../js/jquery-3.3.1.min.js"></script>
<script type="text/javascript">
    // function loadUp() {
    //     if (typeof(FileReader) === 'undefined') {   //如果不支持FileReader
    //         alert("抱歉，你的浏览器不支持FileReader，请使用现代浏览器操作！");
    //         $("#uploader_input").attr('disabled', 'disabled');
    //     } else {
    //         uploaderChange();
    //         deleteUploadImg();
    //     }

    //     $(document).bind('click', function (e) {    //文档绑定点击事件
    //         if (!$(e.target).attr("class") || $(e.target).attr("class").indexOf("uploader-input") != -1) {  //如果点击的是其它区域
    //             $(".uploader-plus").show(); //显示加号
    //             $(".uploader-delete").each(function () {    //取消删除模式
    //                 $(this).removeClass("uploader-delete");
    //             });
    //         }
    //     });
    // };

    /**
     * 上传图片
     */
    // function uploaderChange() {
    //     $("#uploader_input").change(function () {
    //         var file = this.files[0];
    //         if (!/image\/\w+/.test(file.type)) {//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
    //             alert("请确保文件为图像类型");
    //             return false;
    //         }
    //         var reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = function (e) {
    //             //插入图片
    //             var index = $(".uploader-img").length + 1;
    //             $(".uploader-plus").before("<div id='img_" + index + "' class='uploader-box uploader-progress' data-progress='0%'><img class='uploader-img' src='" + this.result + "'/></div>");
    //             uploading("img_" + index);
    //         }
    //     });
    // }

    // function deleteUploadImg() {
    //     $(".uploader-minus").click(function () {    //点击减号进入图片删除模式
    //         var $uploaderItem = $(".uploader-item");
    //         if ($uploaderItem.length == 0) {
    //             return;
    //         }
    //         $(".uploader-plus").hide();
    //         $uploaderItem.each(function () {
    //             $(this).addClass("uploader-delete");
    //         });
    //     });

    //     $(".uploader_file").delegate(".uploader-delete", "click", function (e) {    //点击图片进行删除
    //         $(this).remove();
    //         if ($(".uploader-delete").length == 0) {
    //             $(".uploader-plus").show();
    //         }
    //         stopPropagation(e); //阻止事件冒泡
    //     });
    // }

    /**
     * 显示上传进度
     * @param imgId
     */
    // function uploading(imgId) {
    //     var $img = $("#" + imgId);
    //     var interval = setInterval(function () {
    //         var progress = parseInt($img.attr("data-progress")) + 1;
    //         $img.attr("data-progress", progress + "%");
    //         if (progress == 100) {
    //             clearInterval(interval);
    //             $img.removeClass("uploader-progress");
    //             $img.addClass("uploader-item");
    //             if ($(".uploader-plus").is(":hidden")) {
    //                 $img.addClass("uploader-delete");
    //             }
    //         }
    //     }, 100);
    // }

    /**
     * 阻止事件冒泡
     * @param e
     */
    // function stopPropagation(e) {
    //     if (e.stopPropagation) {
    //         e.stopPropagation();
    //     } else {
    //         e.cancelBubble = true;
    //     }
    // }

</script>
