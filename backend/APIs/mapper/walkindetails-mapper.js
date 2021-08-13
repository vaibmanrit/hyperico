module.exports = {
    walkinDetailsMapper : (walkins) =>{
        let roles=[];
        walkins.forEach(walkin =>{
           roles.push(walkin.RoleName);
        })
        walkins[0].RoleName = roles;
        return walkins[0];
    }
}