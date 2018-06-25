
    // Application variables
    var position = {x: 0, y: window.innerHeight / 2};
    var counter = 0;
    var minFontSize = 3;
    var angleDistortion = 0;
    var letters = '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界，无无明，亦无无明尽，乃至无老死，亦无老死尽。无苦集灭道，无智亦无得。以无所得故。菩提萨埵，依般若波罗蜜多故，心无挂碍。无挂碍故，无有恐怖，远离颠倒梦想，究竟涅盘。三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。'


    // Drawing variables
    var canvas;
    var context;
    var mouse = {x: 0, y: 0, down: false}

    function init() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mouseout', mouseUp, false);
        canvas.addEventListener('dblclick', doubleClick, false);

        window.onresize = function (ev) {
            var oEvent = event || ev;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    function mouseMove(ev) {
        var oEvent = event || ev;
        mouse.x = oEvent.pageX;
        mouse.y = oEvent.pageY;
        draw();
    }

    function draw() {
        if (mouse.down) {
            var d = distance(position, mouse);
            console.log(position.x);
            var fontSize = minFontSize + d / 2;
            var letter = letters[counter];
            var stepSize = textWidth(letter, fontSize);

            if (d > stepSize) {
                var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

                context.font = fontSize + "px Georgia";

                context.save();
                context.translate(position.x, position.y);
                context.rotate(angle);
                context.fillText(letter, 0, 0);
                context.restore();

                counter++;
                if (counter > letters.length - 1) {
                    counter = 0;
                }

                //console.log (position.x + Math.cos( angle ) * stepSize)
                position.x = position.x + Math.cos(angle) * stepSize;
                position.y = position.y + Math.sin(angle) * stepSize;

            }
        }
    }

    function distance(pt, pt2) {

        var xs = 0;
        var ys = 0;

        xs = pt2.x - pt.x;
        xs = xs * xs;

        ys = pt2.y - pt.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    }

    function mouseDown(ev) {
        var oEvent = ev || event
        mouse.down = true;
        position.x = oEvent.pageX;
        position.y = oEvent.pageY;

        document.getElementById('info').style.display = 'none';
    }

    function mouseUp(ev) {
        mouse.down = false;
    }

    function doubleClick(ev) {
        canvas.width = canvas.width;
    }

    function textWidth(string, size) {
        context.font = size+ "px Georgia";

        if (context.fillText) {
            return context.measureText(string).width;
        } else if (context.mozDrawText) {
            return context.mozMeasureText(string);
        }

    }
    ;

    init();
