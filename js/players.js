const players = [
    // Goalkeepers
    { name: "Thibaut Courtois", position: "GK", rating: 90, nation: "Belgium", club: "Real Madrid", photo: "img/Courtois.png" },
    { name: "Alisson", position: "GK", rating: 91, nation: "Brazil", club: "Liverpool", photo: "img/Alisson.png" },
    { name: "Ederson", position: "GK", rating: 89, nation: "Brazil", club: "Manchester City", photo: "img/Ederson.png" },
    
    // Defenders
    { name: "Virgil van Dijk", position: "CB", rating: 96, nation: "Netherlands", club: "Liverpool", photo: "img/van Dijk.png" },
    { name: "Rúben Dias", position: "CB", rating: 95, nation: "Portugal", club: "Manchester City", photo: "img/Ruben Dias.png" },
    { name: "Marquinhos", position: "CB", rating: 91, nation: "Brazil", club: "Paris Saint-Germain", photo: "img/Marquinhos.png" },
    { name: "Trent Alexander-Arnold", position: "RB", rating: 92, nation: "England", club: "Liverpool", photo: "img/Alexander-Arnold.png" },
    { name: "Kounde", position: "RB", rating: 97, nation: "France", club: "Barcelona", photo: "img/Kounde.png" },
    { name: "Jordi Alba", position: "LB", rating: 80, nation: "Spain", club: "Barcelona", photo: "img/Jordi Alba.png" },
    { name: "Mendy", position: "LB", rating: 98, nation: "France", club: "Real Madrid", photo: "img/Mendy.png" },
    
    // Midfielders
    { name: "Kevin De Bruyne", position: "CM", rating: 94, nation: "Belgium", club: "Manchester City", photo: "img/De Bruyne.png" },
    { name: "Luka Modrić", position: "CM", rating: 89, nation: "Croatia", club: "Real Madrid", photo: "img/Modric.png" },
    { name: "Frenkie de Jong", position: "CM", rating: 91, nation: "Netherlands", club: "Barcelona", photo: "img/de Jong.png" },
    { name: "Pedri", position: "CM", rating: 96, nation: "Spain", club: "Barcelona", photo: "img/Pedri.png" },
    { name: "Gavi", position: "CM", rating: 92, nation: "Spain", club: "Barcelona", photo: "img/Gavi.png" },
    { name: "Xavi", position: "CM", rating: 97, nation: "Spain", club: "Icon", photo: "img/Xavi.png" },
    { name: "Bruno Fernandes", position: "CAM", rating: 92, nation: "Portugal", club: "Manchester United", photo: "img/Bruno Fernandes.png" },
    { name: "Bernardo Silva", position: "CAM", rating: 89, nation: "Portugal", club: "Manchester City", photo: "img/Bernardo Silva.png" },
    { name: "Omar Marmoush", position: "CAM", rating: 93, nation: "Egypt", club: "Manchester City", photo: "img/Marmoush.png" },

    // Forwards
    { name: "Kylian Mbappé", position: "ST", rating: 96, nation: "France", club: "Paris Saint-Germain", photo: "img/Mbappe.png" },
    { name: "Erling Haaland", position: "ST", rating: 95, nation: "Norway", club: "Manchester City", photo: "img/Haaland.png" },
    { name: "Lionel Messi", position: "RW", rating: 93, nation: "Argentina", club: "Inter Miami", photo: "img/Messi.png" },
    { name: "Vinicius Junior", position: "LW", rating: 97, nation: "Brazil", club: "Real Madrid", photo: "img/Vini Jr.png" },
    { name: "Rafael Leão", position: "LW", rating: 97, nation: "Portugal", club: "Portugal", photo: "img/Leao.png" },
    { name: "Mohamed Salah", position: "RW", rating: 96, nation: "Egypt", club: "Liverpool", photo: "img/Salah.png" }
];

// Formation positions mapping
const formationPositions = {
    "4-3-1-2": {
        positions: [
            { id: "gk", position: "GK" },
            { id: "lb", position: "LB" },
            { id: "cb1", position: "CB" },
            { id: "cb2", position: "CB" },
            { id: "rb", position: "RB" },
            { id: "cm1", position: "CM" },
            { id: "cm2", position: "CM" },
            { id: "cm3", position: "CM" },
            { id: "cam", position: "CAM" },
            { id: "st1", position: "ST" },
            { id: "st2", position: "ST" }
        ]
    },
    "4-3-3": {
        positions: [
            { id: "gk", position: "GK" },
            { id: "lb", position: "LB" },
            { id: "cb1", position: "CB" },
            { id: "cb2", position: "CB" },
            { id: "rb", position: "RB" },
            { id: "cm1", position: "CM" },
            { id: "cm2", position: "CM" },
            { id: "cm3", position: "CM" },
            { id: "lw", position: "LW" },
            { id: "st", position: "ST" },
            { id: "rw", position: "RW" }
        ]
    },
    "4-4-2": {
        positions: [
            { id: "gk", position: "GK" },
            { id: "lb", position: "LB" },
            { id: "cb1", position: "CB" },
            { id: "cb2", position: "CB" },
            { id: "rb", position: "RB" },
            { id: "lm", position: "LM" },
            { id: "cm1", position: "CM" },
            { id: "cm2", position: "CM" },
            { id: "rm", position: "RM" },
            { id: "st1", position: "ST" },
            { id: "st2", position: "ST" }
        ]
    }
}; 