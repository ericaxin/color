var index = 0;
var blocked = false;
var keys = ["baroque", "rococo", 'realism', 'impressionism', 'fauvism', "abstract"];
var names = [
    "baroque<br />(1600-1750)", 
    "rococo<br />(1699-1780)", 
    'realism<br />(1848-1900)', 
    'impressionism<br />(1865-1885)', 
    'fauvism<br />(1900-1935)', 
    "abstract<br />(1940-1960)"
];

var n_pictures = [3, 2, 3, 3, 3, 3];
var content = [];

var description = [
    [
        "Michelangelo Merisi da Caravaggio<br /> Bacchus, 1596.<br /> Uffizi, Florence",
        "Michelangelo Merisi da Caravaggio<br /> Death of the Virgin, 1606.<br /> Louvre, Paris",
        "Rembrandt<br /> Self-Portrait, 1660.<br /> Metropolitan Museum of Art, New York",
    ],
    [
        "Jean-Honoré Fragonard<br /> The Swing, 1767.<br /> The Wallace Collection, London",
        "Giovanni Battista Tiepolo<br /> Ceiling fresco at Würzburg Residence, 1720–1744.<br /> Würzburg Residence",
    ],
    [
        "Gustave Courbet<br /> La rencontre, 1854.<br /> Musée Fabre, Montpellier",
        "Jean-François Millet<br /> The Gleaners, 1857.<br /> Musée d'Orsay, Paris",
        "Józef Chełmoński<br /> Babie Lato, 1875.<br /> National Museum, Warsaw",
    ],
    [
        "Claude Monet<br /> Houses of Parliament, London, 1900–1901.<br /> Art Institute of Chicago",
        "Claude Monet<br /> Vetheuil in the Fog, 1879.<br /> Musée Marmottan Monet, Paris",
        "Berthe Morisot<br /> Woman at Her Toilette, 1875–1880.<br /> Art Institute of Chicago",
    ],
    [
        "Henri Matisse<br /> Woman with a Hat, 1905.<br /> San Francisco Museum of Modern Art",
        "Henri Matisse<br /> Blue Nude, 1907.<br /> Baltimore Museum of Art",
        "Robert Delaunay<br /> Portrait de Jean Metzinger, 1906<br /> Private Collection",
    ],
    [
        "Hilma af Klint<br /> The Ten Largest, No. 2, Childhood, Group IV, 1907.",
        "Kazimir Malevich<br /> Dynamic Suprematism, 1916.<br /> Tate, London",
        "Piet Mondrian<br /> Composition II in Red, Blue and Yellow, 1929.<br /> National Museum, Belgrade",
    ],
]

var about = [
    "<b>Baroque</b> art is characterized by great drama, rich, deep color, and intense light and dark shadows. Baroque paintings depict the most dramatic moment of action, and are meant to evoke emotion and passion. Its color distributions show a <b>dominance in dark colors followed by a tail in warm tones</b>.",
    "<b>Rococo</b> art relies on white and pastel colors to create surprise and the illusion of motion and drama as a response to the regularity and formality of French Classicism. Its color distributions are characterized by <b>spherical clusters with light colors</b>, such as pink and pastel blue.",
    "<b>Realism</b> represents subject matters truthfully without artificiality and avoids artistic conventions, such as implausible, exotic, and supernatural elements. It aims to glorify everyday life, which contributes to the <b>earthy tones</b> in its color distributions.",
    "<b>Impressionism</b> aims to capture the light, movement and spontaneity of a moment in time. The visible brush strokes add a sense of instantaneity. Its color distributions show <b>tight clusters with slight variances in the same color family</b>, which can be traced to the subtle color transitions of dreamy atmospheres.",
    "<b>Fauvism</b> emphasizes painterly qualities and strident colors over representational values. The subject matters embody a high degree of simplification and abstraction. Its color distributions cover a <b>wide range of hues from vibrant warm tones to strong cool tones</b>.",
    "<b>Abstract</b> art uses shape, form, color and line to create compositions which may exist with a degree of independence from visual references in the world. Its geometric abstraction, evident in solid colors and flattened dimensions, is shown by the <b>disconnected clusters of colors</b>."
]

var load_content = () => {

    for (var key = 0; key < keys.length; key += 1) {
        
        var n = n_pictures[key];
        var path = 'public/' + keys[key];

        var container = document.createElement('div');
        container.className = "content_container";

        
        for (var idx = 1; idx <= n; idx += 1) {

            var outer_group = document.createElement('div');
            outer_group.className = "outer-group";

            var group = document.createElement('div');
            group.className = "group";

            var img = document.createElement('img');
            img.src = path + "/p" + idx + ".jpg";
            img.alt = "";
            img.className = "painting";
            
            var animation = document.createElement('img');
            animation.src = path + "/a" + idx + ".gif";
            animation.alt = "";
            animation.className = "animation";

            group.appendChild(img);
            group.appendChild(animation);

            var text = document.createElement("div");
            text.className = "text"
            text.innerHTML = description[key][idx - 1];

            outer_group.appendChild(group);
            outer_group.appendChild(text);

            container.appendChild(outer_group);

        }


        content.push(container);

    }
}

var select = (bar, text) => {

    bar.style.background = "black";
    bar.style.height = "4vh";
    text.style.color = "black";

    var container = document.getElementById("content");
    container.innerHTML = ""

    container.appendChild(content[index]);

    var about_container = document.getElementById("about");
    about_container.innerHTML = about[index];

}


var unselect = (bar, text) => {

    bar.style.background = "grey";
    bar.style.height = "3vh";
    text.style.color = "grey";

}



var make_bar = (container, color1, color2, text, bars) => {

    var idx = bars.length;

    // make bar 
    var bar_container = document.createElement('div');
    bar_container.className = "bar_container";

    var con1 = document.createElement('div');
    con1.className = "connection";
    con1.style.background = color1;


    var bar = document.createElement('div');
    bar.className = "bar";

    var con2 = document.createElement('div');
    con2.className = "connection";
    con2.style.background = color2;


    bar_container.appendChild(con1);
    bar_container.appendChild(bar);
    bar_container.appendChild(con2);


    // make label
    var text_container = document.createElement("div");
    text_container.className = "text_container";
    text_container.innerHTML = text;

    // put them togehter in a container
    var item_container = document.createElement('div');
    item_container.className = "item_container";

    item_container.appendChild(bar_container);
    item_container.appendChild(text_container);

    item_container.addEventListener("mouseenter", () => {

        unselect(bars[index].bar, bars[index].text);

        index = idx;
        blocked = true;

        select(bar, text_container);

    })

    item_container.addEventListener("mouseleave", () => {

        blocked = false;

    })

    container.appendChild(item_container);

    bars.push({
        bar: bar,
        text: text_container
    });

}



var generate = (container, keys) => {

    var bars = [];

    for (var idx = 0; idx < keys.length; idx += 1) {
        make_bar(container, "grey", "grey", names[idx], bars);
    }

    return bars

}


var update = (bars) => {

    if (!blocked) {

        unselect(bars[index].bar, bars[index].text);

        index = (index + 1) % bars.length;

        select(bars[index].bar, bars[index].text);

    }

    setTimeout(() => update(bars), 1500);


}


load_content();

var timeline = document.getElementById("timeline");
var bars = generate(timeline, keys);

// to start at the first
index = bars.length - 1;
update(bars);




