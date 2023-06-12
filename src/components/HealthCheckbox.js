const HealthCheckbox = (props) => {
    const [ profile, setProfile ] = props.statePassed
    const diseaseField = props.diseaseField

    return(
        <div className="d-flex align-items-center">
            <label className="switch col-5">
                <input
                    type="checkbox"
                    onChange={(e) => setProfile({
                        ...profile, 
                        healthBackground: {
                            ...profile.healthBackground, 
                            [diseaseField]: {
                                ...profile.healthBackground[diseaseField],
                                hasDisease: e.target.checked
                            }
                        }
                    })}
                    checked={profile.healthBackground[diseaseField].hasDisease}
                />
                <span className="slider round"></span> 
            </label>
            <input
                className="medication-input"
                type="text"
                placeholder="On medication..."
                disabled={!profile.healthBackground[diseaseField].hasDisease}
                value={profile.healthBackground[diseaseField].medication?profile.healthBackground[diseaseField].medication:""}
                onChange={(e) => setProfile({
                    ...profile, 
                    healthBackground: {
                        ...profile.healthBackground, 
                        [diseaseField]: {
                            ...profile.healthBackground[diseaseField],
                            medication: e.target.value
                        }
                    }
                })}
            />
        </div>
    )
}

export default HealthCheckbox