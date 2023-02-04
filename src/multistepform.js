import React, { useState } from 'react';
function MultiStepForm() {
    const [step, setStep] = useState(1);
    let toLookFor="";
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [banking, setBanking] = useState("");

    function form_steps() {
        switch (step) {
            case 1:
                toLookFor = name;
                return (
                    <>
                        Name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"/>
                    </>
                );
            case 2:
                toLookFor = profession;
                return (
                    <>
                        Profession: <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} className="form-control" />
                    </>
                );
            case 3:
                toLookFor = banking;
                return (
                    <>
                        Banking: <input type="text" value={banking} onChange={(e) => setBanking(e.target.value)} className="form-control" />
                    </>
                );
            case 4:
                return (
                    <>
                        Name: {name}<br/>
                        Profession: {profession}<br />
                        Banking: {banking }
                    </>
                );
        }
    }
    return (
        <div className="container">
            <div class="progress mt-5" role="progressbar" aria-label="Default striped example" aria-valuenow={step} aria-valuemin="1" aria-valuemax="4" style={{height:"30px"} }>
                <div class="progress-bar progress-bar-striped" style={{ width: 25 * step + "%" }} >Step {step}</div>
            </div>
            <div className="mt-5">
                {form_steps()}
            </div>
            <div className="d-flex justify-content-between mt-5">
            <button className="btn btn-outline-secondary" onClick={() => {
                if (step > 1)
                    setStep(index=>index-1)
                }} disabled={step === 1}><i class="bi bi-chevron-compact-left"></i> Previous</button>
                <button className="btn btn-outline-secondary" onClick={() => {
                    if (step < 4)
                        setStep(index => index + 1)
                }} disabled={step === 4 || toLookFor === ""}>Next <i class="bi bi-chevron-compact-right"></i></button>
            </div>
        </div>
        );
}
export default MultiStepForm;