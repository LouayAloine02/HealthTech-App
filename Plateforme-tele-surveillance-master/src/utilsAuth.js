/* eslint-disable prettier/prettier */
import client from "./utilsClient";
import axios from "axios";

export const signIn = async (values) => {
    console.log(values.password)
    try {
        const { data } = await client.post('/user/signinmedecin',
            { ...values })
        console.log("yaa")
        console.log(data)

        return { data: data, success: true }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const signInpatient = async (values) => {

    try {
        const { data } = await client.post('/user/signinpatient',
            { ...values })
        console.log("yaa")
        console.log(data)

        return { data: data, success: true }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};


export const signin = async (values) => {

    try {
        const { data } = await client.post('/patient/signin', { ...values });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const signinadmin = async (values) => {

    try {
        const { data } = await client.post('/user/signin',
            { ...values })

        return { data: data, success: true }

    }
    catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const signup = async (values) => {

    try {
        const { data } = await client.post('/patient/create', { ...values });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const signupadmin = async (values) => {

    try {
        const { data } = await client.post('/admin/create', { ...values });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const signupmedecinH = async (id, values) => {

    try {

        const { data } = await client.post('/medecinH/create', { id, ...values });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const signuppatientH = async (id, values) => {

    try {
        const { data } = await client.post('/patientH/create', { id, ...values });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const signuphopital = async (values) => {

    try {
        const { data } = await client.post('/hopital/create', { ...values });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const signupmedecin = async (values) => {

    try {
        console.log("hellooo")
        const { data } = await client.post('/medecin/ajouterMedecin', { ...values });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};



export const forgetPassword = async email => {

    try {
        const { data } = await client.post('/admin/forgot-password', { email });
        console.log(data)

        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const verifyEmail = async (otp, patientId) => {

    try {
        const { data } = await client.post('/patient/verify-email', { otp, patientId });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const verifyEmailadmin = async (otp, adminId) => {

    try {
        const { data } = await client.post('/admin/verify-email', { otp, adminId });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const verifyEmailmedecin = async (otp, medecinId) => {

    try {
        const { data } = await client.post('/medecin/verifyEmail', { otp, medecinId });
        console.log(data)
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const verifyEmailhopital = async (otp, hopitalId) => {

    try {
        const { data } = await client.post('/hopital/verify-email', { otp, hopitalId });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const updateadmin = async (values, id) => {

    try {
        const { data } = await client.put(`/admin/update/${id}`, { ...values });
        return { data: data, success: true }

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const updatehopital = async (values, id) => {

    try {
        const { data } = await client.put(`/hopital/update/${id}`, { ...values });
        return { data: data, success: true }

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const affecter = async (values, id) => {

    try {
        const { data } = await client.post(`/patientmedecin/affecter/${id}`, { ...values });
        console.log(data)
        console.log("fatmamamamam")
        return { data: data, success: true }

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

}

export const affecterPH = async (values) => {

    try {
        const { data } = await client.post(`/patient/affecter`, { ...values });
        return { data: data, success: true }


    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

}



export const calend = async (patientId, jourd, moisd, anneed) => {

    try {
        const { data } = await client.post('/patient/save-calendrier', { patientId, jourd, moisd, anneed });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const reveil = async (calendrierId, jour, mois, annee, heure, minute, mood) => {

    try {
        const { data } = await client.post('/patient/save-reveil', { calendrierId, jour, mois, annee, heure, minute, mood });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const toilette = async (calendrierId, jour, mois, annee, heure, minute, accident, volume, besoin) => {

    try {
        const { data } = await client.post('/patient/save-toilette', { calendrierId, jour, mois, annee, heure, minute, accident, volume, besoin });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const boisson = async (calendrierId, jour, mois, annee, heure, minute, volume, type) => {

    try {
        const { data } = await client.post('/patient/save-boisson', { calendrierId, jour, mois, annee, heure, minute, volume, type });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const coucher = async (calendrierId, jour, mois, annee, heure, minute, mood) => {

    try {
        const { data } = await client.post('/patient/save-coucher', { calendrierId, jour, mois, annee, heure, minute, mood });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const protection = async (calendrierId, jour, mois, annee, heure, minute, poids) => {

    try {
        const { data } = await client.post('/patient/save-protection', { calendrierId, jour, mois, annee, heure, minute, poids });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const ajoutSymp = async (patientId, values, symptomes) => {

    try {
        const { data } = await client.post('/patient/envoyer-symptome', { patientId, values, symptomes });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};





export const ViewCalendrier = async (patientId) => {

    try {
        const { data } = await client.get(`/patient/voir-calendrier/${patientId}`);
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};

export const deleterev = async (id) => {

    try {
        const { data } = await client.post('/patient/delete-rev', { id });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const quiz = async (patientId, jourd, moisd, anneed) => {


    try {
        const { data } = await client.post(`/patient/save-quiz/${patientId}`, { jourd, moisd, anneed });
        console.log(data)


        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const saveQuestionnaire1 = async (score, id) => {

    try {
        const { data } = await client.post(`/patient/save-questionnaire1/${id}`, { score });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const saveQuestionnaire2 = async (score, id) => {

    try {
        const { data } = await client.post(`/patient/save-questionnaire2/${id}`, { score });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};
export const saveQuestionnaire3 = async (score, id) => {

    try {
        const { data } = await client.post(`/patient/save-questionnaire3/${id}`, { score });
        return data

    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return { success: false, error: error.message }
    }

};