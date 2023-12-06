function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};
loco();

var clutter = "";
document.querySelector("#page2>h1").textContent.split("").forEach(function (dets) {
    clutter += `<span>${dets}</span>`

    document.querySelector("#page2>h1").innerHTML = clutter;
})


gsap.to("#page2>h1>span", {
    scrollTrigger: {
        trigger: `#page2>h1>span`,
        start: `top bottom`,
        end: `bottom top`,
        scroller: `#main`,
        scrub: .5,
    },
    stagger: .2,
    color: `#fff`
})

function canvas() {
    const canvas = document.querySelector("#page3>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        ./images/frames00001.png
        ./images/frames00002.png
        ./images/frames00003.png
        ./images/frames00004.png
        ./images/frames00005.png
        ./images/frames00006.png
        ./images/frames00007.png
        ./images/frames00008.png
        ./images/frames00009.png
        ./images/frames00010.png
        ./images/frames00011.png
        ./images/frames00012.png
        ./images/frames00013.png
        ./images/frames00014.png
        ./images/frames00015.png
        ./images/frames00016.png
        ./images/frames00017.png
        ./images/frames00018.png
        ./images/frames00019.png
        ./images/frames00020.png
        ./images/frames00021.png
        ./images/frames00022.png
        ./images/frames00023.png
        ./images/frames00024.png
        ./images/frames00025.png
        ./images/frames00026.png
        ./images/frames00027.png
        ./images/frames00028.png
        ./images/frames00029.png
        ./images/frames00030.png
        ./images/frames00032.png
        ./images/frames00033.png
        ./images/frames00034.png
        ./images/frames00035.png
        ./images/frames00036.png
        ./images/frames00037.png
        ./images/frames00038.png
        ./images/frames00039.png
        ./images/frames00040.png
        ./images/frames00041.png
        ./images/frames00042.png
        ./images/frames00043.png
        ./images/frames00044.png
        ./images/frames00045.png
        ./images/frames00046.png
        ./images/frames00047.png
        ./images/frames00048.png
        ./images/frames00049.png
        ./images/frames00050.png
        ./images/frames00051.png
        ./images/frames00052.png
        ./images/frames00053.png
        ./images/frames00054.png
        ./images/frames00055.png
        ./images/frames00056.png
        ./images/frames00057.png
        ./images/frames00058.png
        ./images/frames00059.png
        ./images/frames00060.png
        ./images/frames00061.png
        ./images/frames00062.png
        ./images/frames00063.png
        ./images/frames00064.png
        ./images/frames00065.png
        ./images/frames00066.png
        ./images/frames00067.png
        `;
        return data.split("\n")[index];
    }

    const frameCount = 67;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page3`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: "#page3",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas()