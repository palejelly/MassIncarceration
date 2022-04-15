var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully',
    'fixed_left': 'fixed_left'
}

var prisonLngLat = [];
var departXY_tileWindowCoord = [];
var destXY_tileWindowCoord = [];


function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function(prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}
var innerHeight
var innerWidth
var scroll_progress
//acquire innerheight to set the scroll event
function setScroll(){
    innerHeight= window.innerHeight;
    innerWidth = window.innerWidth;
}

window.addEventListener('DOMContentLoaded', (event) => {
    setScroll();
    // console.log(innerHeight);

});

var tile_frame= document.querySelector("#tile_frame.slide");
  
var largemap_0= document.querySelector("#largemap_0");
var largemap_1= document.querySelector("#largemap_1");
var largemap_2= document.querySelector("#largemap_2");


//--------------------------------- tiling part starts --------------------------------

var common_zoom_level = 13.6
var common_style = "satellite-v9"
var username = "mapbox"

var insert_point = document.getElementById("tile_frame")
var open_prison_div = [];

var initial_zoom_level = 6;

function format() {
    var args = Array.prototype.slice.call (arguments, 1);
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) {
       return args[index];
    });
 }

function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }
  
  
// get info from csv
var url = "https://palejelly.github.io/MapboxImageTileCSV/CoEditVer_NewYorkStatePrisons.csv";
var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

var test_arr = csvToArray(request.responseText);
var list_length = test_arr.length-1
// there is newline at the last line


function getAddress(username,style_id,lon,lat,zoom,width,height){
    var baseStr="https://api.mapbox.com/styles/v1/{0}/{1}/static/{2},{3},{4}/{5}x{6}?access_token={7}"
    
    return format(baseStr,username,style_id,lon,lat,zoom,width,height,'pk.eyJ1IjoicGFsZWplbGx5IiwiYSI6ImNrejhua2FvMzFtaTcyd3AxbTZ1M3ZxdmEifQ.UCz4YzJg9PHy9AgB1G_NMQ')
}

var tilelist=[];
var keylist=[];

for (let key in test_arr[0]){
    keylist.push(key);
}

for (let i=0; i<list_length ; i++){
    // iterate through array made from csv
    var line = test_arr[i]

    var box = document.createElement("div");
    var img_tag = document.createElement("img");
    

    img_tag.classList.add('center-cropped');
    img_tag.setAttribute('alt',String(i));
    

    box.setAttribute('id','map'.concat(String(i)));
    box.classList.add('tile');
    

    box_dom=insert_point.appendChild(box);
    box_insertpoint= document.getElementById('map'.concat(String(i)));
    box_insertpoint.appendChild(img_tag);

    tilelist.push(box);


    var text_box = document.createElement("div");
    text_box.classList.add('tile_hover_text');
    box_insertpoint.appendChild(text_box);
    
    var lat_lng_check = 0;
    var coord_anchor=[];
    if (coord === undefined){
        var coord={lat:0,lng:0};
    }
    var prison_name="";

    for (let j in keylist){
      

        var des_text = document.createElement("p");
        
        if(lat_lng_check==2){
            // this means latitude and longitude information are all acquired. 
            var coord_a = document.createElement("a");

            //put the coordinate into the list of tuples
            prisonLngLat.push([coord['lng'],coord['lat']]);
            // sets anchor href for flyMap
            // for (let a in coord_anchor){
            //     coord_a.setAttribute('href',format('javascript:mapFly(map,[{0}])',[coord['lng'],coord['lat']]));
            // };
            
            if(line['name']===''){
                continue;
            }
            // // places marker 
            // addMarker(map,[coord['lng'],coord['lat']],prison_name);

            // Get image from mapbox using html post,get
            try{
                img_tag.setAttribute('src',getAddress(username,common_style,coord['lng'],coord['lat'],common_zoom_level,600,600))
            }catch(error){
                console.log("there's an error on i="+i);
                console.log(error);
            }
            // coord_a.classList.add("coordinate");

            // coord_a.innerText=String([coord['lng'],coord['lat']]);
            // text_box.appendChild(coord_a);


            // do this only once per prison

            lat_lng_check=0;
        }


        if (keylist[j]=='name'){
            des_text.classList.add('name');
            prison_name = line[keylist[j]];

            des_text.innerText=line[keylist[j]];
            text_box.appendChild(des_text);

        }
        else if (keylist[j]=='open or closed'){
            if(line[keylist[j]] == 'open'){
                open_prison_div.push(box_dom);
            }
            des_text.innerText=line[keylist[j]];
            text_box.appendChild(des_text);

        }
        else if(keylist[j]=='Lat'){
            var latitude = line[keylist[j]];
            des_text = document.createElement("a");
            des_text.classList.add("coordinate");
            coord_anchor.push(des_text);
            coord['lat'] = latitude;
            lat_lng_check += 1;            

        }
        else if(keylist[j]=='Lng'){
            var longitude = line[keylist[j]];
            des_text = document.createElement("a");
            des_text.classList.add("coordinate");
            coord_anchor.push(des_text);
            coord['lng']=longitude;

            lat_lng_check += 1;
        }
        else if (keylist[j]=='Building Since'){
            built_year = line[keylist[j]];
            if(built_year === ""){
                built_year = 'N/A';
            }

            des_text.innerText=format('Built year: '+built_year);
            text_box.appendChild(des_text);
        }
        else if (keylist[j]=='Prison Since'){
            var prison_since = line[keylist[j]];
            if(prison_since === ""){
                prison_since = 'N/A';
            }

            des_text.innerText=format('Prison since: '+ prison_since);
            text_box.appendChild(des_text);
        }
        else if (keylist[j]=='Town'){
            town = line[keylist[j]];
            if(town === ""){
                town = '-';
            }

            des_text.innerText=format('Town: '+town);
            text_box.appendChild(des_text);
        }

        else if (keylist[j]=='Original Function'){
            og_function = line[keylist[j]];
            if(og_function == 'No data for now'){
                og_function = '-';
            }

            des_text.innerText=format('Original Function: ' + og_function);
            box_insertpoint.appendChild(des_text);

        }
        else if(keylist[j]=='Notes'){
            notes = line[keylist[j]];
            if(notes === ""){
                notes = '-';
            }
            des_text.innerText=format('Notes: '+ notes);
            text_box.appendChild(des_text);
        }
        else if(keylist[j]=='Average Population'){
            var average_population = line[keylist[j]];
            if(average_population === ""){
                average_population = 'N/A';
            }
            des_text.innerText=format('Average population: '+ average_population);
            text_box.appendChild(des_text);
        }
        else if(keylist[j]=='Close Date'){
            var close_date = line[keylist[j]];
            if(close_date === ""){
                close_date = 'N/A';
            }
            des_text.innerText=format('Close date: '+ close_date);
            text_box.appendChild(des_text);
        }

        

    }

}
const only_closed_checkbox = document.querySelector('input[id="only_closed"]');



// only_closed_checkbox.onclick = () => {
//     if(only_closed_checkbox.checked){
//         for (let i in open_prison_div){
//             open_prison_div[i].classList.add('open');
//         }
//     }
//     else{
//         for (let i in open_prison_div){
//             open_prison_div[i].classList.remove('open');
//         }
//     }
// }


// ----------------------tiling part ended.


let ticking = false;

function foo() {
    if (!ticking) {

        ticking = true;
        requestAnimationFrame(() => {
            if(window.scrollY>innerHeight*9){
                // largemap_2.style.display = "block";
                // largemap_2.style.opacity = 1;
                // largemap_1.style.opacity = 0;
                // largemap_1.style.display = "none";

                largemap_2.classList.add("scroll_locked");
                largemap_1.classList.remove("scroll_locked");


            }
            else if(window.scrollY>innerHeight*8){
                // largemap_1.style.display = "block";
                // largemap_1.style.opacity = 1;
                // largemap_0.style.opacity = 0;
                largemap_1.classList.add("scroll_locked");
                largemap_0.classList.remove("scroll_locked");



            }else if(window.scrollY>innerHeight*7){
                tile_frame.style.opacity = 0;

                tile_frame.style.display = "none";
                tile_frame.classList.add("fade_out");
                
                largemap_0.classList.add("scroll_locked");

                // largemap_1.style.display = "block";

            }else if (window.scrollY>innerHeight*6) {
                tile_frame.style.display = "block";

                scroll_progress = (window.scrollY-innerHeight*6)/innerHeight;
                largemap_0.style.opacity = scroll_progress;
                tile_frame.style.opacity = 1-scroll_progress;
                for(let i in tilelist){

                    tilelist[i].style.top=format("{0}px",(destXY_tileWindowCoord[i][1]-departXY_tileWindowCoord[i][1])*scroll_progress);

                    tilelist[i].style.left=format("{0}px",(destXY_tileWindowCoord[i][0]-departXY_tileWindowCoord[i][0])*scroll_progress);


                    tilelist[i].style.borderRadius= format("{0}vw",8.13*scroll_progress);

                    tilelist[i].style.transform = format("scale({0})", 1-scroll_progress);

                }
            }else if (window.scrollY>innerHeight*5) {
                for(let i in open_prison_div){
                    open_prison_div[i].classList.add("open");
                }
                for(let i in tilelist){

                    tilelist[i].style.top=format("{0}px",0);
                    tilelist[i].style.left=format("{0}px",0);
                }

            }else if (window.scrollY>innerHeight*4) {
                acquireTileLocation([-80.535294, 40.244927, -66.533218, 45.347304]);
                tile_frame.classList.add("scroll_locked");
                for(let i in open_prison_div){
                    open_prison_div[i].classList.remove("open");
                }
            }else if(window.scrollY>innerHeight*3){
                tile_frame.classList.remove("scroll_locked");

            }
            ticking = false;
        });
    }
}

window.addEventListener("scroll", foo, { passive: true });




// prisonlnglat is defined at the beggining

function acquireTileLocation(boundinglnglat){
    for (let i in tilelist){
        // console.log("inside_tilelist");
        departXY_tileWindowCoord.push([tilelist[i].getBoundingClientRect().left, tilelist[i].getBoundingClientRect().top]);

        const destX_windowCoord = innerWidth/(boundinglnglat[2]-boundinglnglat[0])*(prisonLngLat[i][0]-boundinglnglat[0]);
        const destY_windowCoord = innerHeight-innerHeight/(boundinglnglat[3]-boundinglnglat[1])*(prisonLngLat[i][1]-boundinglnglat[1]);
        
        destXY_tileWindowCoord.push([destX_windowCoord,destY_windowCoord]);


    }

}





// var story = document.getElementById('story');
// var features = document.createElement('div');
// features.setAttribute('id', 'features');

// var header = document.createElement('div');

// if (config.title) {
//     var titleText = document.createElement('h1');
//     titleText.innerText = config.title;
//     header.appendChild(titleText);
// }

// if (config.subtitle) {
//     var subtitleText = document.createElement('h2');
//     subtitleText.innerText = config.subtitle;
//     header.appendChild(subtitleText);
// }

// if (config.byline) {
//     var bylineText = document.createElement('p');
//     bylineText.innerText = config.byline;
//     header.appendChild(bylineText);
// }

// if (header.innerText.length > 0) {
//     header.classList.add(config.theme);
//     header.setAttribute('id', 'header');
//     story.appendChild(header);
// }

// config.chapters.forEach((record, idx) => {
//     var container = document.createElement('div');
//     var chapter = document.createElement('div');

//     if (record.title) {
//         var title = document.createElement('h3');
//         title.innerText = record.title;
//         chapter.appendChild(title);
//     }

//     if (record.image) {
//         var image = new Image();
//         image.src = record.image;
//         chapter.appendChild(image);
//     }

//     if (record.description) {
//         var story = document.createElement('p');
//         story.innerHTML = record.description;
//         chapter.appendChild(story);
//     }

//     container.setAttribute('id', record.id);
//     container.classList.add('step');
//     if (idx === 0) {
//         container.classList.add('active');
//     }

//     chapter.classList.add(config.theme);
//     container.appendChild(chapter);
//     container.classList.add(alignments[record.alignment] || 'centered');
//     if (record.hidden) {
//         container.classList.add('hidden');
//     }
//     features.appendChild(container);
// });

// story.appendChild(features);

// var footer = document.createElement('div');

// if (config.footer) {
//     var footerText = document.createElement('p');
//     footerText.innerHTML = config.footer;
//     footer.appendChild(footerText);
// }

// if (footer.innerText.length > 0) {
//     footer.classList.add(config.theme);
//     footer.setAttribute('id', 'footer');
//     story.appendChild(footer);
// }

// mapboxgl.accessToken = config.accessToken;

// const transformRequest = (url) => {
//     const hasQuery = url.indexOf("?") !== -1;
//     const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";

//     return {
//       url: url + suffix
//     }
// }

// var map = new mapboxgl.Map({
//     container: 'map',
//     style: config.style,
//     center: config.chapters[0].location.center,
//     zoom: config.chapters[0].location.zoom,
//     bearing: config.chapters[0].location.bearing,
//     pitch: config.chapters[0].location.pitch,
//     interactive: false,
//     transformRequest: transformRequest
// });

// if (config.showMarkers) {
//     var marker = new mapboxgl.Marker({ color: config.markerColor });
//     marker.setLngLat(config.chapters[0].location.center).addTo(map);
// }

// // instantiate the scrollama
// var scroller = scrollama();

// map.on("load", function() {
    
//     if (config.use3dTerrain) {
//         map.addSource('mapbox-dem', {
//             'type': 'raster-dem',
//             'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//             'tileSize': 512,
//             'maxzoom': 14
//         });
//         // add the DEM source as a terrain layer with exaggerated height
//         map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

//         // add a sky layer that will show when the map is highly pitched
//         map.addLayer({
//             'id': 'sky',
//             'type': 'sky',
//             'paint': {
//                 'sky-type': 'atmosphere',
//                 'sky-atmosphere-sun': [0.0, 0.0],
//                 'sky-atmosphere-sun-intensity': 15
//             }
//         });
//     };

//     // setup the instance, pass callback functions
//     scroller
//     .setup({
//         step: '.step',
//         offset: 0.7,
//         progress: true
//     })
//     .onStepEnter(response => {
//         var chapter = config.chapters.find(chap => chap.id === response.element.id);
//         response.element.classList.add('active');
//         map[chapter.mapAnimation || 'flyTo'](chapter.location);

//         if (config.showMarkers) {
//             marker.setLngLat(chapter.location.center);
//         }
//         if (chapter.onChapterEnter.length > 0) {
//             chapter.onChapterEnter.forEach(setLayerOpacity);
//         }
//         if (chapter.callback) {
//             window[chapter.callback]();
//         }
//         if (chapter.rotateAnimation) {
//             map.once('moveend', function() {
//                 const rotateNumber = map.getBearing();
//                 map.rotateTo(rotateNumber + 90, {
//                     duration: 24000, easing: function (t) {
//                         return t;
//                     }
//                 });
//             });
//         }
//     })
//     .onStepExit(response => {
//         var chapter = config.chapters.find(chap => chap.id === response.element.id);
//         response.element.classList.remove('active');
//         if (chapter.onChapterExit.length > 0) {
//             chapter.onChapterExit.forEach(setLayerOpacity);
//         }
//     });
// });

// setup resize event
// window.addEventListener('resize', scroller.resize);
window.onbeforeunload = function (e) {
    var e = e || window.event;

    // For IE and Firefox
    if (e) {
        e.returnValue = 'Leaving the page';
    }

    // For Safari
    return 'Leaving the page';
};
