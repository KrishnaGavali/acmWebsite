async function main() {
    const getData = async () => {
        const response = await fetch('teamsData.json');
        const data = await response.json();
        return data;
    };

    const displayData = async () => {
        const TeamidType = [];
        const data = await getData();
        const mainDiv = document.getElementById('subDiv2');

        if (!data || typeof data !== 'object') {
            console.error("Data format is incorrect:", data);
            return TeamidType;
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const teamDiv = document.createElement('div');
                teamDiv.setAttribute('class', 'teamsDiv');
                teamDiv.setAttribute('id', `teamsMemberList${key}`);
                TeamidType.push(`teamsMemberList${key}`);

                const teamTitle = document.createElement('h1');
                teamTitle.setAttribute('class', 'poppins-regular teamTitle');
                teamTitle.setAttribute('id', `teamTitle${key}`);
                teamTitle.innerText = key;

                const teamMemberList = document.createElement('div');
                teamMemberList.setAttribute('class', 'teamsList');

                mainDiv.appendChild(teamDiv);
                teamDiv.appendChild(teamTitle);
                teamDiv.appendChild(teamMemberList);

                for (const element of data[key]) {
                    const teamMember = document.createElement('div');
                    teamMember.setAttribute('class', 'teamMember');

                    const memberPhoto = document.createElement('div');
                    memberPhoto.setAttribute('class', 'memberPhoto');
                    memberPhoto.innerHTML = `<img src="${element.photo}" alt="Generic Avatar" height="150px">`;

                    const memberName = document.createElement('div');
                    memberName.setAttribute('class', 'memberName');
                    memberName.innerText = element.name;

                    const memberRole = document.createElement('div');
                    memberRole.setAttribute('class', 'memberRole');
                    memberRole.innerText = element.role;

                    teamMember.appendChild(memberPhoto);
                    teamMember.appendChild(memberName);
                    teamMember.appendChild(memberRole);
                    teamMemberList.appendChild(teamMember);
                }
            }
        }

        return TeamidType;
    };

    const teamId = await displayData();

    const typeIdarray = ["teamsType1", "teamsType2", "teamsType3", "teamsType4", "teamsType5"];

    if (teamId.length !== typeIdarray.length) {
        console.error("Mismatch between typeIdarray and teamId lengths");
        return;
    }

    for (let i = 0; i < typeIdarray.length; i++) {
        const typeElement = document.getElementById(typeIdarray[i]);
        if (typeElement) {
            typeElement.addEventListener('click', () => {
                const teamElement = document.getElementById(teamId[i]);
                if (teamElement) {
                    teamElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error(`Element with ID ${teamId[i]} not found`);
                }
            });
        } else {
            console.error(`Element with ID ${typeIdarray[i]} not found`);
        }
    }
}

main();
