
    properties = {
    "isShare":"True",
    "isToc":"True",
    "isCopy":"True",
    "isThumbnail":"True",
    "isDownload":"True"
    }

    properties.isShare = (properties.isShare == "True") ? true:false;
    properties.isToc = (properties.isToc == "True") ? true:false;
    properties.isCopy = (properties.isCopy == "True") ? true:false;
    properties.isThumbnail = (properties.isThumbnail == "True") ? true:false;
    properties.isDownload = (properties.isDownload == "True") ? true:false;

    LANG = 'en';
    LOCALS_FOLDER = "locals";
    ASSETS_FOLDER = '../';
    PAGES_CONTENT_FOLDER='../common/pages-content';
    TITLE = "Product Guide";
    COVER_SRC = "../flash/pages/page0001_s.jpg";
    SPREAD_SRC = "../flash/spread.html";
    FULL_SRC = "../../../index.html";
    LINK = "_blank";
    RTL = ("False" == "True")? true:false;
	
	PublicationTypeName = 'digital catalog';
	PublicationTypeUrl = 'http://flippingbook.com/online-digital-catalog';

  