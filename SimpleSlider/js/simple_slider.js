/**
 * Created by JetBrains PhpStorm.
 * User: toannk
 * Date: 10/17/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $(function(){
        var n=$('#maskjcarousel li').size();
        var w=$('#maskjcarousel li:first').outerWidth()+10;
        $('#maskjcarousel').width(n*w);

        var iActive=0;
        var iScroll=0;
        var s=4;

        $('#slprev').css('opacity','0.6');
        $('#slnext').click(function(){
            if(iActive<n-s){
                $('#slprev').css('opacity','1');
                iActive++;
                iScroll+=w;
                $('#maskjcarousel').animate({'left':-iScroll},500);
            }
            if(iActive==(n-s)){
                $(this).css('opacity','0.6');
            }
        });
        $('#slprev').click(function(){
            if(iActive>0){
                $('#slnext').css('opacity','1');
                iActive--;
                iScroll-=w;
                $('#maskjcarousel').animate({'left':-iScroll},500);
            }
            if(iActive==0){
                $(this).css('opacity','0.6');
            }
        });
    });
})(jQuery);