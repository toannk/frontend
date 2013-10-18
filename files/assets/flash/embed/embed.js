var leftImageSrc;
var rightImageSrc; 

var neededState = "complete";

function gup( name )
{
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}

/*var ver = getInternetExplorerVersion();
var page = gup('p');
var format = gup('f');
var pageName = gup('page');
var link = gup('link');*/
/*if(ver!=-1 && ver < 9) {

    function prepareArgs() {
        return (page && page != "" ? "p="+page:"p=1") +
            (pageName && pageName != "" ? "&page="+pageName:"") +
        (format && format != "" ? "&f="+format.charAt(0):"");

    }

    var args = prepareArgs();

	if(window.location.search.toString().indexOf("mode=spread")!=-1){
        window.location.search = "?mode=page" + (args != "" ? "&" + args : "");
    } else {
        window.location = "./page.html"+ (args != "" ? "?" + args + (link && link != "" ? "&link="+link:""): (link && link != "" ? "?link="+link:""));
    }
} else*/ if (document.readyState == neededState) {
    init();
} else {
    if (document.addEventListener) {
        document.addEventListener("readystatechange", init, false);
    } else {
        document.attachEvent("onreadystatechange", init);
    }
}

var leftImage = document.createElement('img');
var rightImage = document.createElement('img');

var background;
var animation;
var onePage;
var pageExtension = "_s";
var embedDiv;
var cornerIsOnTheLeft;
function init() {
    function extractExtention(pos, value) {
        var lower = value;
        if(lower != "s") {
            return "page"+fill4Zero(pos)+pageExtension+(lower == 'j' ? ".jpg" : ".png");
        } else {
            return "pagestub.png";
        }
    }

    if (document.readyState == neededState) {
        embedDiv = document.getElementById("flippingBookEmbed");
        linkElement = document.getElementById("publicationLink");

        leftImageSrc = window["assetsPath"] + "/";
        bookDiv = document.createElement("div");

        var emptyRequest = gup("p") == "" && gup("a") == "" && gup("f") == "";
        var position = emptyRequest ? 1 : parseInt(gup("p"));

        leftImageSrc += extractExtention(position, emptyRequest?"j":gup("f").charAt(0));
        var rightToLeft =  gup("v").toLowerCase() == "rtl";


        if (gup("a") != "" || emptyRequest) {
            onePage = gup("a").toLowerCase() == "o" || emptyRequest;
        } else {
            rightImageSrc = window["assetsPath"] + "/" + extractExtention(position+1, gup("f").charAt(0));
        }

        var linkSrc = gup("link");
        linkElement.href = linkSrc != "" ? decodeURIComponent(linkSrc) : window["currentLink"];
        var ver = getInternetExplorerVersion();
        if(ver!=-1 && ver < 9) {
            leftImage.onload = checkLoadedForStatic;
            rightImage.onload = checkLoadedForStatic;
            leftImage.style.position = 'absolute';
            rightImage.style.position = 'absolute';

            var hover = document.getElementById("fbHover");
            var embed = document.getElementById("fbEmbed");

            if(ver < 8) {
                document.getElementById("PageTitle").style.display = "block";
                document.getElementById("PageTitle").style.padding = "6 6 6 6";
                document.getElementById("PageTitle").style.backgroundColor = "rgb(65,65,65)";
                document.getElementById("bottomLink").style.backgroundColor = "rgb(65,65,65)";
                document.getElementById("column").style.borderLeft = "";
            }

            function mouseover() {
                hover.style.zIndex = '100';
            }
            hover.style.zIndex = '-100';

            embed.attachEvent("onmouseover", mouseover);
            function mouseout() {
                hover.style.zIndex = '-10';
            }

            embed.attachEvent("onmouseout", mouseout);

        } else {
            cornerIsOnTheLeft = !rightToLeft ? (onePage && position>=2) : !(onePage && position>=2) ;

            background = document.createElement('canvas');
            animation = document.createElement('canvas');

            embedDiv.appendChild(background);
            embedDiv.appendChild(animation);

            background.style.position = 'absolute';
            animation.style.position = 'absolute';

            leftImage.onload = checkLoadedForCanvas;
            rightImage.onload = checkLoadedForCanvas;
        }

        leftImage.onerror = errorMsg;
        rightImage.onerror = errorMsg;

        if(rightImageSrc&&rightToLeft) {
            var temp = rightImageSrc;
            rightImageSrc = leftImageSrc;
            leftImageSrc = temp;
        }

        leftImage.src = leftImageSrc;
        if (rightImageSrc) {
            rightImage.src = rightImageSrc;
        }
    }
}

var cornerPercent = 0.25;
var cornerAngle = Math.PI/2 - Math.PI/10;
var cornerSize;

function errorMsg() {
    console.log("error", arguments);
}

function px(size) {
    return size.toString() + "px";
}

function checkLoadedForStatic() {
    var wide = !rightImageSrc && !onePage;
    if (leftImage.readyState == "complete" && (!rightImageSrc || rightImage.readyState == "complete")) {

        var width = leftImage.width * (wide||onePage?1:2);
        var height = leftImage.height;

        embedDiv.style.width = px(width);
        embedDiv.style.height = px(height);

        embedDiv.appendChild(leftImage);

        if(rightImageSrc) {
            embedDiv.appendChild(rightImage);
            rightImage.style.left = px(leftImage.width);
            rightImage.width = leftImage.width;
            rightImage.height = leftImage.height;
        }

        if(!onePage){
            //drawShadow();
        }
    }
}

function checkLoadedForCanvas() {
    var wide = !rightImageSrc && !onePage;
    if (leftImage.complete && (!rightImageSrc || rightImage.complete)) {

        var pageWidth = leftImage.width; // TODO seems to be bookWidth/2 from settings
        var pageHeight = leftImage.height;
        //var targetWidth = window.innerWidth;
        //var targetHeight = window.innerHeight;

        var srcBookWidth = leftImage.width * (wide||onePage?1:2);
        var srcBookHeight = leftImage.height;
        var targetWidth = srcBookWidth;//embedDiv.offsetWidth;
        var targetHeight = srcBookHeight;//embedDiv.offsetHeight;

        var width = Math.min(targetWidth, targetHeight/srcBookHeight*srcBookWidth);
        var height = width/srcBookWidth*srcBookHeight;
        //width /= 2;

        var ctx = background.getContext('2d');

        background.width  = width / 1;//(onePage?2:1);
        background.height = height;

        animation.width = background.width;
        animation.height = background.height;

        embedDiv.style.width = px(width);
        embedDiv.style.height = px(height);

        ctx.drawImage(leftImage, 0, 0, pageWidth, pageHeight, 0, 0, width / (rightImageSrc/*||onePage*/ ? 2 : 1), height);

        if (rightImageSrc) {
            ctx.drawImage(rightImage, 0, 0, rightImage.width, rightImage.height, width / 2, 0, width / 2, height);
        }

        ctx.save();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.strokeRect(0,0,width,height);
        ctx.restore();

        function centerRect(dw, dh, w, h) { return { x: (dw - w) / 2, y: (dh - h) / 2 }; }; // TODO:common util

        //var r = centerRect(targetWidth, targetHeight, width, height);

        cornerSize = cornerPercent * width / 2;

        //bookDiv.style.left = px((onePage?background.width/2:0));
        //bookDiv.style.top = px(r.y);

        if(!onePage){
            drawShadow();
        }

        texture = ctx.createPattern(background, 'repeat');

        startAnimation();
    }
}

var texture;

function drawShadow() {
    var csStart = 3 * animation.width / 8;
    var csWidth = 7 * animation.width / 40;
    var ctx = background.getContext('2d');
    var gradient = ctx.createLinearGradient(csStart, 0, csStart+csWidth, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.34, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(5/7-0.1, 'rgba(0, 0, 0, 0.4)');
    gradient.addColorStop(5/7, 'rgba(0, 0, 0, 0.53)');
    gradient.addColorStop(5/7+2/7*70/255, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(5 / 7 + 2 / 7 * 170 / 255, 'rgba(0, 0, 0, 0.07)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.moveTo(csStart, 0);
    ctx.lineTo(csStart + csWidth, 0);
    ctx.lineTo(csStart + csWidth, animation.height);
    ctx.lineTo(csStart, animation.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

function startAnimation() {
    setInterval(drawFrame, 30);
}
function fill4Zero(i) {
    if (i < 1000) {
        var zeros = (Math.pow(10, 4 - (i.toString().length))).toString().slice(1);
        return zeros + i.toString();
    } else {
        return i.toString();
    }
}
var counter = 0;
function drawFrame() {
    drawCorner(0.5 + 0.5 * Math.sin(-Math.PI / 2 + counter * Math.PI / 100));
    counter++;
}

function drawCorner(percent) {


    var grabSize = percent * cornerSize;

    var sizeW = grabSize / Math.sin(cornerAngle);
    var sizeH = grabSize / Math.cos(cornerAngle);
    var sizeW2 = sizeW*(1 - Math.cos(2*cornerAngle));
    var sizeH2 = sizeW * Math.sin(2*cornerAngle);
    var ctx = animation.getContext('2d');
    animation.width = animation.width;
    //ctx.clearRect(animation.width - cornerSize, 0, cornerSize, cornerSize); //TODO: canvas bug
    //ctx.clearRect(0, 0, animation.width, animation.height);
    ctx.fillStyle = "blue";
    ctx.fillStyle = texture;
    ctx.beginPath();
    function trianglePath() {
        if(!cornerIsOnTheLeft) {
            ctx.moveTo(animation.width - sizeW, 0);
            ctx.lineTo(animation.width, 0);
            ctx.lineTo(animation.width, sizeH);
            ctx.lineTo(animation.width - sizeW, 0);
        } else {
            ctx.moveTo(0, 0);
            ctx.lineTo(sizeW, 0);
            ctx.lineTo(0, sizeH);
            ctx.lineTo(0, 0);
        }
    }
    trianglePath();
    ctx.closePath();
    ctx.save();
    ctx.transform(-1, 0, 0, 1, 0, 0);
    ctx.fill();
    ctx.restore();
    var gx = grabSize * Math.sin(cornerAngle);
    var gy = grabSize * Math.cos(cornerAngle);
    var gradient = !cornerIsOnTheLeft?ctx.createLinearGradient(animation.width - 2*gx, 2*gy, animation.width - gx, gy):ctx.createLinearGradient(2*gx, 2*gy, gx, gy);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.72, 'rgba(0, 0, 0, 0.2)');
    gradient.addColorStop(0.89, 'rgba(0, 0, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    function triangle2() {
        if(!cornerIsOnTheLeft) {
            ctx.moveTo(animation.width - sizeW, 0);
            ctx.lineTo(animation.width - sizeW2, sizeH2);
            ctx.lineTo(animation.width, sizeH);
            ctx.lineTo(animation.width - sizeW, 0);
        } else {
            ctx.moveTo(sizeW, 0);
            ctx.lineTo(sizeW2, sizeH2);
            ctx.lineTo(0, sizeH);
            ctx.lineTo(sizeW, 0);
        }
    }
    triangle2();
    ctx.closePath();
    ctx.fillStyle = texture;
    ctx.save();

    ctx.transform(1, 0, 0, 1, cornerIsOnTheLeft ? 2 * gx : animation.width - 2 * gx, 2 * gy);
    ctx.rotate(2 * cornerAngle - Math.PI);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = gradient;
    ctx.fill();
}


function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}
