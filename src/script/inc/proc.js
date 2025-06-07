import helpData from '../../../data/help.json';
import aboutData from '../../../data/about.json';
import skillsData from '../../../data/skills.json';
import projectsData from '../../../data/projects.json';

import { cli } from './cli.js';

const SVG_RIGHT_ARROW = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9a9996" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

/**
 * Prompts an error message, and suggest to the user to type the 'help' command.
 */
function _error() {
    cli.newOutput('Non recognized command, try typing <span class="cli-primary">help</span> to see available commands');
}

/**
 * Deletes everything that was written on the CLI.
 */
function _clear() {
    cli.CLI.innerHTML = null
}

/**
 * Displays all the available commands and explain what they do.
 */
function _help() {
    let output = '<p>Here is a list of available commands :</p><table class="help"><tbody>';
    helpData.forEach(line => {
        output += `<tr><td class="cli-primary">${line.cmd}</td><td>${SVG_RIGHT_ARROW}</td><td>${line.desc}</td></tr>`
    });
    output += '</tbody></table>';
    cli.newOutput(output);
}

/**
 * Displays the neofetch stuff.
 */
function _about() {

    // Automatically calculate my age
    const myBirthday = new Date('2005-05-25');
    const today = new Date();
    const myAge = today.getFullYear() - myBirthday.getFullYear();

    const cs = 3;
    let output = `<div class="about"><div></div><table><tbody>
        <tr><td colspan="1"><h2>OS</h2></td><td colspan="${cs - 1}">Filia0S v${aboutData.version}</td></tr>
        <tr><td colspan="${cs}"><h2>Identity</h2></td></tr>
        <tr><td class="cli-primary">Who</td><td>${SVG_RIGHT_ARROW}</td><td>Luc FILIAO (${myAge} years old)</td></tr>
        <tr><td class="cli-primary">Nat.</td><td>${SVG_RIGHT_ARROW}</td><td>French</td></tr>
        <tr><td class="cli-primary">Job</td><td>${SVG_RIGHT_ARROW}</td><td>${aboutData.job}</td></tr>
        <tr><td colspan="${cs}"><h2>Hobbies</h2></td></tr>
    `;
    aboutData.hobbies.forEach(hobby => {
        output += `<tr><td class="cli-primary">${hobby.icon}</td><td>${SVG_RIGHT_ARROW}</td><td>${hobby.content}</td></tr>`;
    });
    output += '</tbody></table></div>';
    cli.newOutput(output);
}

/**
 * Displays the skills.
 */
function _skills() {
    let output = '<div class="skills">';
    skillsData.forEach(skill => {
        output += `<div class="skill"><img src="img/${skill.img}"><h2 class="cli-primary">${skill.name}</h2>`;
        if (skill.projects.length) {
            output += '<p class="cli-dim">Utilisé dans</p>';
            skill.projects.forEach((val, index) => {
                const project = projectsData[val];
                output += index > 0 ? ', ' : '';
                output += project.name;
            });
        }
        output += '</div>';
    });
    output += '</div>';
    cli.newOutput(output);
}

function _projects() {
    let output = '<div class="projects">';
    projectsData.forEach(project => {
        const projectImg = project.img ? `<img src="img/${project.img}">` : "";
        const projectGit = project.git ? `<a class="cli-dim" href="${project.git}" target="blank">${project.git}</a>` : '';
        output += `<div class="project">${projectImg}<h2><span class="cli-primary">${project.name}</span>${projectGit}</h2>`;
        if (project.skills.length) {
            output += '<p class="cli-dim">Compétences utilisées</p><p>';
            project.skills.forEach((val, index) => {
                const skill = skillsData[val];
                output += index > 0 ? ', ' : '';
                output += skill.name;
            });
            output += '</p>';
        }
        output += '</div>';
    });
    output += '</div>';
    cli.newOutput(output);
}

/* === EXPORT === */

export const proc = {
    error       : _error,
    clear       : _clear,
    help        : _help,
    about       : _about,
    skills      : _skills,
    projects    : _projects
};