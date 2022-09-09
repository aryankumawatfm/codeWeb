const clip = document.querySelectorAll('.gallery-image');
for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener('mouseenter',
    function (e) { clip[i].play() }
    )
    
    clip[i].addEventListener('mouseout',
    function(e){clip[i].pause()}
    )
} 

// const video = document.querySelectorAll('.course_image video');
// for (let i = 0; i < video.length; i++) {
//     video[i].addEventListener('mouseenter',
//         function (e) { video[i].play() }
//     )
    
//     video[i].addEventListener('mouseout',
//         function(e){video[i].pause()}
//         )
// }