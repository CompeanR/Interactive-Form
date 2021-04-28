const nameForm = document.querySelector('#name');
nameForm.focus();

const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

//console.log(jobRole, otherJobRole);

otherJobRole.style.display = 'none'

jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    };
});

const design = document.querySelector('#design');
const color = document.querySelector('#color');
color.disabled = true

design.addEventListener('change', (e) => {
    color.disabled = false;

    for (let i = 0; i < color.length; i++) {
        const designColor = e.target.value;
        const currentColor = color[i].getAttribute('data-theme');

        if (designColor == currentColor) {
            color[i].hidden = false;
            e.target.setAttribute('selected', true);
        } else {
            color[i].hidden = true;
            e.target.setAttribute('selected', false);
        };
    };
})
