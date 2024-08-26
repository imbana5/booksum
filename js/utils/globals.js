/*
 * BookSum - globals.js 1.0
 * Copyright 2024 SkyLabs.
 */

function isDefined() { return (typeof o != 'undefined'); }
function isEmpty(e) { return e == null || e == ""; }
function isPhone() { return !isTabletOrDesktop(); }
function isPortrait() { return screen.orientation.type.startsWith("portrait"); }
function isString(o) { return (typeof o == 'string'); }
function isTabletOrDesktop() {
    let ua = navigator.userAgent.toLowerCase();
    let bT = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua);
    let bP = /Android|webOS|iPhone|iPod|Blackberry/i.test(ua);
    return (bT ? bT : !bP);
}

function isSmall() { return (window.innerWidth <= 500); }
function isMedium() { return (window.innerWidth <= 768); }
   
function urlHas(s) {
    let sUrl = window.location.href;
    console.log("urlHas(" + s + "): " + sUrl.includes(s));
    return sUrl.includes(s);
}

function isNumber(char) {
    if (typeof char !== 'string') { return false; }
    if (char.trim() === '') { return false; }
    return !isNaN(char);
}

function isDocument(filename) {
    let ext = filename.split(".").pop().toLowerCase();
    return ext == "pdf" || ext == "docx" || ext == "doc";
}

function isImage(filename) {
    let ext = filename.split(".").pop().toLowerCase();
    return ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bmp";
}

function isVideo(filename) {
  let ext = filename.split(".").pop().toLowerCase();
  return ext == "mp4" || ext == "avi"; 
}

function getFilename(fullPath) { return fullPath.replace(/^.*[\\\/]/, ''); }
function getHash() {
    return window.location.hash.substr(1);
}

function getQuery(q) {
    let p = new URLSearchParams(window.location.search);
    return p.get(q) != null ? p.get(q) : null;
}

function setHash(h) {
    return window.location.hash = h;
}

function convertNewLines(s) {
    if (!isDefined(s) || s == null) { return s; }
    return s.replace(/\r\n|\r|\n/g,"<br />");
}

function revertNewLines(s) {
    return s.replace(/<br\s?\/?>/g,"\n");
}

function latLonToCoord(lat, lon) {
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
}

function displayCoordinate(center, coord) {   
    dMap = document.getElementById("map");
    if (dMap == null) { return; }
    
    const map = new google.maps.Map(dMap, {
        zoom: 13,
        center: center,
        disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
        position: coord,
        map: map,
    });
}

function displayTwoCoordinates(center, coord0, coord1, textLabel) {   
    dMap = document.getElementById("map");
    if (dMap == null) { return; }

    let pinColor = "#ea4335";

    let pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
    let labelOriginHole = new google.maps.Point(12,15);
    let pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
    let labelOriginFilled =  new google.maps.Point(12,9);

    let markerImage = {
        path: pinSVGHole,
        anchor: new google.maps.Point(12,17),
        fillOpacity: 1,
        fillColor: pinColor,
        strokeWeight: 2,
        strokeColor: "#B41412",
        scale: 1.5,
        labelOrigin: labelOriginFilled
    };
    
    let label = {
        text: textLabel,
        color: "#5491f5",
        fontSize: "12px",
    };

    const map = new google.maps.Map(dMap, {
        zoom: 13,
        center: center,
        disableDefaultUI: true,
    });

    const marker0 = new google.maps.Marker({
        position: coord0,
        map: map,
    });

    const marker1 = new google.maps.Marker({
        position: coord1,
        label: label,
        icon: markerImage,
        map: map,
    });
}

function getSiteCoordinate() {
    return getOfficeCoordinate();
}

function getOfficeCoordinate() {
    let lat = document.getElementById("map-lat").value;
    let lon = document.getElementById("map-lon").value;
    return latLonToCoord(lat, lon);
}

function displayOfficeCoordinate() {
    let coord = getOfficeCoordinate();
    displayCoordinate(coord, coord);
}

function displaySiteCoordinate() {
    let coord = getOfficeCoordinate();
    displayCoordinate(coord, coord);
}

/*--------------------------------------------------------------------------*
 * jQuery methods                                                           *
 *--------------------------------------------------------------------------*/
function classIf(d, s, b) {
    if (b) { d.addClass(s); } else { d.removeClass(s); }
}

function hide(d) {
    return d.addClass("hide");
}

function hideIf(d, bHide) {
    if (bHide == true) { return hide(d); }
    return show(d);
}

function show(d) {
    return d.removeClass("hide");
}

function showIf(d, bShow) {
    if (bShow == true) { return show(d); }
    return hide(d);
}