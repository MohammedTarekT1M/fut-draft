document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-background');
    const content = document.getElementById('main-content');
    const buttons = document.querySelectorAll('button');
    const backgroundSelection = document.getElementById('background-selection');
    const backgroundOptions = document.querySelectorAll('.background-option');
    let selectedPlayers = new Map();

    // When video ends, show content and enable buttons
    video.addEventListener('ended', function() {
        content.classList.add('visible');
        buttons.forEach(button => button.classList.add('active'));
    });

    // Handle Start Draft button click
    document.getElementById('start-draft').addEventListener('click', function() {
        backgroundSelection.classList.add('visible');
    });

    // Handle Rules button click
    document.getElementById('rules').addEventListener('click', function() {
        // Add your rules functionality here
        console.log('Rules clicked');
    });

    // Handle formation selection
    backgroundOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            backgroundOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Get the formation name from the paragraph text
            const formationName = this.querySelector('p').textContent;
            
            // Store the selected formation
            localStorage.setItem('selectedFormation', formationName);
            
            // Hide the selection screen
            backgroundSelection.classList.remove('visible');
            
            // Hide the main content
            content.classList.remove('visible');
            
            // Create and show the draft screen
            createDraftScreen(formationName);
        });
    });

    function getRandomPlayers(position, count = 3) {
        const positionPlayers = players.filter(player => player.position === position);
        const shuffled = positionPlayers.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function generateComputerSquad() {
        const formation = localStorage.getItem('selectedFormation');
        const positions = formationPositions[formation].positions;
        const computerSquad = new Map();
        
        positions.forEach(pos => {
            const availablePlayers = players.filter(player => 
                player.position === pos.position && 
                !Array.from(selectedPlayers.values()).some(selected => selected.name === player.name)
            );
            
            if (availablePlayers.length > 0) {
                const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
                computerSquad.set(pos.id, randomPlayer);
            }
        });
        
        return computerSquad;
    }

    function createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="player-info">
                <div class="player-photo">
                    <img src="${player.photo}" alt="${player.name}">
                </div>
                <div class="player-details">
                    <div class="player-name">${player.name}</div>
                    <div class="player-rating">${player.rating}</div>
                    <div class="player-meta">
                        <span class="player-nation">${player.nation}</span>
                        <span class="player-club">${player.club}</span>
                    </div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => selectPlayer(player));
        return card;
    }

    function selectPlayer(player) {
        const currentPosition = document.querySelector('.position-selecting');
        if (currentPosition) {
            const positionId = currentPosition.dataset.positionId;
            const position = currentPosition.dataset.position;
            
            if (player.position === position) {
                selectedPlayers.set(positionId, player);
                currentPosition.innerHTML = `
                    <div class="selected-player">
                        <div class="player-photo">
                            <img src="${player.photo}" alt="${player.name}">
                        </div>
                        <div class="player-info">
                            <div class="player-name">${player.name}</div>
                            <div class="player-rating">${player.rating}</div>
                        </div>
                    </div>
                `;
                currentPosition.classList.remove('position-selecting');
                showNextPosition();
            } else {
                alert(`Please select a ${position} for this position`);
            }
        }
    }

    function showNextPosition() {
        const formation = localStorage.getItem('selectedFormation');
        const positions = formationPositions[formation].positions;
        const unselectedPosition = positions.find(pos => !selectedPlayers.has(pos.id));
        
        if (unselectedPosition) {
            const positionElement = document.getElementById(unselectedPosition.id);
            positionElement.classList.add('position-selecting');
            positionElement.dataset.position = unselectedPosition.position;
            
            // Show player options for this position
            const playerOptions = getRandomPlayers(unselectedPosition.position);
            const playerGrid = document.querySelector('.player-grid');
            playerGrid.innerHTML = '';
            playerOptions.forEach(player => {
                playerGrid.appendChild(createPlayerCard(player));
            });
        } else {
            // All positions are filled
            console.log('All positions filled, showing continue button');
            document.querySelector('.player-selection').style.display = 'none';
            const continueBtn = document.querySelector('.continue-button');
            console.log('Continue button found:', continueBtn);
            if (continueBtn) {
                continueBtn.style.display = 'block';
                console.log('Continue button display set to block');
                console.log('Button element:', continueBtn);
                console.log('Button style:', continueBtn.style.display);
            } else {
                console.error('Continue button not found!');
            }
        }
    }

    function createDraftScreen(formation) {
        // Create draft screen container
        const draftScreen = document.createElement('div');
        draftScreen.id = 'draft-screen';
        draftScreen.className = 'draft-screen';
        
        // Add formation display
        const formationDisplay = document.createElement('div');
        formationDisplay.className = 'formation-display';
        formationDisplay.innerHTML = `
            <h2>Selected Formation: ${formation}</h2>
            <div class="formation-grid">
                <div class="formation-positions">
                    ${formationPositions[formation].positions.map(pos => `
                        <div class="position" id="${pos.id}" data-position-id="${pos.id}">
                            <span class="position-label">${pos.position}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add player selection area
        const playerSelection = document.createElement('div');
        playerSelection.className = 'player-selection';
        playerSelection.innerHTML = `
            <h3>Select Your Players</h3>
            <div class="player-grid">
                <!-- Player cards will be added here -->
            </div>
        `;
        
        // Add continue button
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-button active';
        continueButton.textContent = 'Continue';
        continueButton.style.display = 'none';
        continueButton.style.cursor = 'pointer';
        continueButton.addEventListener('click', function() {
            console.log('Continue button clicked');
            try {
                createMatchScreen();
            } catch (error) {
                console.error('Error in createMatchScreen:', error);
            }
        });
        
        // Assemble the draft screen
        draftScreen.appendChild(formationDisplay);
        draftScreen.appendChild(playerSelection);
        draftScreen.appendChild(continueButton);
        
        // Add to the document
        document.body.appendChild(draftScreen);
        
        // Add styles for the draft screen
        const style = document.createElement('style');
        style.textContent = `
            .draft-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                z-index: 1000;
            }
            
            .formation-display {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .formation-display h2 {
                color: #f8d000;
                margin-bottom: 20px;
            }
            
            .formation-grid {
                width: 400px;
                height: 300px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                position: relative;
            }
            
            .formation-grid img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            
            .formation-positions {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .position {
                position: absolute;
                width: 60px;
                height: 60px;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .position.position-selecting {
                background: rgba(248, 208, 0, 0.7);
                transform: scale(1.1);
            }
            
            .position-label {
                font-size: 12px;
                font-weight: bold;
            }
            
            .player-selection {
                width: 80%;
                max-width: 1200px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .player-selection h3 {
                color: #f8d000;
                margin-bottom: 20px;
            }
            
            .player-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
            }
            
            .player-card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                padding: 15px;
                cursor: pointer;
                transition: transform 0.2s;
                display: flex;
                align-items: center;
            }
            
            .player-card:hover {
                transform: scale(1.05);
                background: rgba(248, 208, 0, 0.2);
            }
            
            .player-photo {
                width: 80px;
                height: 80px;
                margin-right: 15px;
                border-radius: 5px;
                overflow: hidden;
            }
            
            .player-photo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .player-details {
                flex: 1;
            }
            
            .player-name {
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 16px;
            }
            
            .player-rating {
                font-size: 24px;
                color: #f8d000;
                margin-bottom: 5px;
            }
            
            .player-meta {
                font-size: 12px;
                color: #aaa;
                display: flex;
                gap: 10px;
            }
            
            .position {
                width: 80px;
                height: 80px;
            }
            
            .selected-player {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .selected-player .player-photo {
                width: 50px;
                height: 50px;
                margin-bottom: 5px;
            }
            
            .selected-player .player-name {
                font-size: 12px;
                margin-bottom: 2px;
            }
            
            .selected-player .player-rating {
                font-size: 16px;
                margin-bottom: 0;
            }
            
            .continue-button {
                padding: 15px 30px;
                font-size: 18px;
                background: linear-gradient(to bottom, #f8d000, #d4b000);
                border: none;
                border-radius: 5px;
                color: #000;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.2s;
                text-transform: uppercase;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            
            .continue-button:hover {
                transform: scale(1.05);
                background: linear-gradient(to bottom, #ffd800, #e4c000);
            }
        `;
        
        document.head.appendChild(style);
        
        // Position the formation positions
        const positions = formationPositions[formation].positions;
        positions.forEach((pos, index) => {
            const positionElement = document.getElementById(pos.id);
            // Add position-specific styling based on formation
            // This is a simplified version - you might want to adjust the positions based on your formation images
            const positions = {
                gk: { top: '10%', left: '50%' },
                lb: { top: '30%', left: '20%' },
                cb1: { top: '30%', left: '40%' },
                cb2: { top: '30%', left: '60%' },
                rb: { top: '30%', left: '80%' },
                cm1: { top: '50%', left: '30%' },
                cm2: { top: '50%', left: '50%' },
                cm3: { top: '50%', left: '70%' },
                cam: { top: '70%', left: '50%' },
                st1: { top: '90%', left: '40%' },
                st2: { top: '90%', left: '60%' },
                lw: { top: '70%', left: '30%' },
                st: { top: '90%', left: '50%' },
                rw: { top: '70%', left: '70%' },
                lm: { top: '70%', left: '20%' },
                rm: { top: '70%', left: '80%' }
            };
            
            if (positions[pos.id]) {
                positionElement.style.top = positions[pos.id].top;
                positionElement.style.left = positions[pos.id].left;
                positionElement.style.transform = 'translate(-50%, -50%)';
                positionElement.style.width = '60px';
                positionElement.style.height = '60px';
                positionElement.style.borderRadius = '50%';
                
            }
        });
        
        // Start the player selection process
        showNextPosition();
    }

    function createMatchScreen() {
        console.log('createMatchScreen function called');
        // Generate computer squad
        const computerSquad = generateComputerSquad();
        const formation = localStorage.getItem('selectedFormation');
        console.log('Formation:', formation);
        console.log('Computer squad:', computerSquad);
        
        // Hide the draft screen
        const draftScreen = document.getElementById('draft-screen');
        draftScreen.style.display = 'none';
        
        // Create match screen container
        const matchScreen = document.createElement('div');
        matchScreen.id = 'match-screen';
        matchScreen.className = 'match-screen';
        
        // Calculate squad ratings
        const userRating = calculateSquadRating(selectedPlayers);
        const computerRating = calculateSquadRating(computerSquad);
        
        // Create match content
        matchScreen.innerHTML = `
            <div class="match-header">
                <h2>Match Preview</h2>
                <div class="formation-info">Formation: ${formation}</div>
            </div>
            
            <div class="squads-container">
                <div class="squad user-squad">
                    <h3>Your Squad</h3>
                    <div class="squad-rating">Overall Rating: ${userRating}</div>
                    <div class="formation-display-small">
                        ${generateFormationHTML(formation, selectedPlayers, 'user')}
                    </div>
                </div>
                
                <div class="vs-divider">
                    <span class="vs-text">VS</span>
                </div>
                
                <div class="squad computer-squad">
                    <h3>Computer Squad</h3>
                    <div class="squad-rating">Overall Rating: ${computerRating}</div>
                    <div class="formation-display-small">
                        ${generateFormationHTML(formation, computerSquad, 'computer')}
                    </div>
                </div>
            </div>
            
            <div class="match-actions">
                <button class="play-match-btn">Play Match</button>
                <button class="back-to-draft-btn">Back to Draft</button>
            </div>
        `;
        
        // Add match screen styles
        const matchStyle = document.createElement('style');
        matchStyle.textContent = `
            .match-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                z-index: 1001;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .match-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .match-header h2 {
                color: #f8d000;
                font-size: 2.5em;
                margin-bottom: 10px;
            }
            
            .formation-info {
                color: #ccc;
                font-size: 1.2em;
            }
            
            .squads-container {
                display: flex;
                align-items: center;
                gap: 50px;
                margin-bottom: 40px;
                width: 100%;
                max-width: 1200px;
            }
            
            .squad {
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
            }
            
            .squad h3 {
                color: #f8d000;
                margin-bottom: 15px;
                font-size: 1.5em;
            }
            
            .squad-rating {
                color: #fff;
                font-size: 1.2em;
                font-weight: bold;
                margin-bottom: 20px;
            }
            
            .vs-divider {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 100px;
            }
            
            .vs-text {
                font-size: 3em;
                font-weight: bold;
                color: #f8d000;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            }
            
            .formation-display-small {
                width: 300px;
                height: 200px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                margin: 0 auto;
                position: relative;
                border: 2px solid rgba(248, 208, 0, 0.3);
            }
            
            .player-mini {
                position: absolute;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 2px solid #f8d000;
                font-size: 10px;
                text-align: center;
                transform: translate(-50%, -50%);
            }
            
            .player-mini .name {
                font-size: 8px;
                line-height: 1;
                margin-bottom: 2px;
            }
            
            .player-mini .rating {
                font-size: 10px;
                color: #f8d000;
                font-weight: bold;
            }
            
            .match-actions {
                display: flex;
                gap: 20px;
            }
            
            .play-match-btn, .back-to-draft-btn {
                padding: 15px 30px;
                font-size: 18px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                text-transform: uppercase;
                transition: transform 0.2s;
            }
            
            .play-match-btn {
                background: linear-gradient(to bottom, #4CAF50, #45a049);
                color: white;
            }
            
            .back-to-draft-btn {
                background: linear-gradient(to bottom, #f44336, #d32f2f);
                color: white;
            }
            
            .play-match-btn:hover, .back-to-draft-btn:hover {
                transform: scale(1.05);
            }
        `;
        
        document.head.appendChild(matchStyle);
        
        // Add event listeners
        matchScreen.querySelector('.play-match-btn').addEventListener('click', function() {
            // Add match simulation logic here
            alert('Match simulation would start here!');
        });
        
        matchScreen.querySelector('.back-to-draft-btn').addEventListener('click', function() {
            matchScreen.remove();
            draftScreen.style.display = 'flex';
        });
        
        // Add to document
        document.body.appendChild(matchScreen);
    }

    function calculateSquadRating(squad) {
        let totalRating = 0;
        let playerCount = 0;
        
        squad.forEach(player => {
            totalRating += player.rating;
            playerCount++;
        });
        
        return playerCount > 0 ? Math.round(totalRating / playerCount) : 0;
    }

    function generateFormationHTML(formation, squad, teamType) {
        const positions = formationPositions[formation].positions;
        let html = '';
        
        positions.forEach(pos => {
            const player = squad.get(pos.id);
            if (player) {
                const positionStyles = getPositionStyles(pos.id);
                html += `
                    <div class="player-mini" style="top: ${positionStyles.top}; left: ${positionStyles.left};">
                        <div class="name">${player.name.split(' ').pop()}</div>
                        <div class="rating">${player.rating}</div>
                    </div>
                `;
            }
        });
        
        return html;
    }

    function getPositionStyles(positionId) {
        const positions = {
            gk: { top: '15%', left: '50%' },
            lb: { top: '35%', left: '15%' },
            cb1: { top: '35%', left: '35%' },
            cb2: { top: '35%', left: '65%' },
            rb: { top: '35%', left: '85%' },
            cm1: { top: '55%', left: '25%' },
            cm2: { top: '55%', left: '50%' },
            cm3: { top: '55%', left: '75%' },
            cam: { top: '75%', left: '50%' },
            st1: { top: '90%', left: '40%' },
            st2: { top: '90%', left: '60%' },
            lw: { top: '75%', left: '25%' },
            st: { top: '90%', left: '50%' },
            rw: { top: '75%', left: '75%' },
            lm: { top: '75%', left: '15%' },
            rm: { top: '75%', left: '85%' }
        };
        
        return positions[positionId] || { top: '50%', left: '50%' };
    }
});