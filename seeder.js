const fs = require('fs');

function getDownloadUrl(url) {
    const queryParams = url.split('?')[1];
    let searchParams = new URLSearchParams(queryParams);
    if (searchParams.has('query')) return `https://www.clinicaltrialsregister.eu/ctr-search/rest/download/full?query=${searchParams.get('query')}&mode=current_page`;
    return url;
}

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};  

function isDateValid(date) {
    let d = new Date(date);
    if (!d.isValid()) return new Date();
    return d;
}

function verifyRecruitmentStatus(status) {
    if (!status) return 'N/A';
    return status;
}

async function getTrials() {
    const data = fs.readFileSync('covid19.json').toString();
    const covidJson = JSON.parse(data);
    return new Promise((resolve, reject) => {
        let trials = [];
        for (let trial of covidJson.Trials_downloaded_from_ICTRP.Trial) {
            if (trial.Countries && trial.Contact_Address && trial.web_address) {
                const countriesByTrial = trial.Countries.split(/[;]+/).filter(Boolean);
                let formattedTrial = {
                    trialID: trial.TrialID,
                    registeredBy: trial.Source_Register,
                    registeredDate: isDateValid(trial.Date_registration),
                    country: countriesByTrial[0],
                    trialAddress: trial.Contact_Address.replace(/[^\w ]/, '').trim(),
                    downloadUrl: getDownloadUrl(trial.web_address),
                    prospectiveRegistration: trial.Retrospective_flag,
                    primarySponsor: trial.Primary_sponsor,
                    publicTitle: trial.Public_title,
                    scientificTitle: trial.Scientific_title,
                    initialEnrollmentDate: isDateValid(trial.Date_enrollement),
                    targetSize: trial.Target_size,
                    recruitmentStatus: verifyRecruitmentStatus(trial.Recruitment_Status),
                    url: trial.web_address,
                    studyType: trial.Study_type,
                    studyDesign: trial.Study_design,
                    phase: trial.Phase.toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                trials.push(formattedTrial);
            }
        }
        resolve(trials);
    });
}

async function getCriterias() {
    const data = fs.readFileSync('covid19.json').toString();
    const covidJson = JSON.parse(data);
    return new Promise((resolve, reject) => {
        let criterias = [];
        for (let trial of covidJson.Trials_downloaded_from_ICTRP.Trial) {
            if (trial.Countries && trial.Contact_Address && trial.web_address) {
                let formattedCriteria = {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ageMin: trial.Inclusion_agemin,
                    ageMax: trial.Inclusion_agemax,
                    gender: trial.Inclusion_gender,
                    healthCondition: trial.Condition,
                    inclusion: trial.Inclusion_Criteria,
                    exclusion: trial.Exclusion_Criteria,
                    intervention: trial.Intervention,
                    trialTrialID: trial.TrialID
                };

                criterias.push(formattedCriteria);
            }
        }
        resolve(criterias);
    });
}

module.exports = {
    getTrials,
    getCriterias,
}