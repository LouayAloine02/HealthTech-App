import axios from "axios";
import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import useEffect from 'react'
import useState from 'react'

export default function Form() {
    const navigation = useNavigate();
    const [invalidAdmin, setInvalidAdmin] = useState("")
    const [busy, setBusy] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [newMotdepasse, setNewMotdepasse] = useState({
        motdepasse: '',
        confirmermotdepasse: ''
    })
    const location = useLocation();
setBusy(true);
    const { token, id } = queryString.parse(location.search)
    useEffect(() => {

        const verifyToken = async () => {

            try {
                


                const { data } = await axios(`http://localhost:3000/api/admin/verify-token?token=${token}&id=${id}`);
                setBusy(false)
                console.log(data)

            }
            catch (error) {
                if (error?.response?.data) {
                    const { data } = error.response;
                    if (!data.success)
                        return setInvalidAdmin(data.error)
                    return console.log(error.response.data)
                }
                console.log(error)
            }

        };


        verifyToken();
    }, [id , token]);


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setNewMotdepasse({ ...newMotdepasse, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { motdepasse, confirmermotdepasse } = newMotdepasse
        if (motdepasse.trim().length < 8 || motdepasse.trim().length > 20)
            return setError('Mot de passe doit etre entre 8 et 20 caractères')
        if (motdepasse !== confirmermotdepasse)
            return setError('mot de passe incompatible ')
        try {
            setBusy(true)
            const { data } = await axios.post(`http://localhost:3000/api/admin/reset-password?token=${token}&id=${id}`, { motdepasse });
            setBusy(false)
            if (data.success) {
                navigation.replace('/reset-password');
                setSuccess(true)

            }

        }
        catch (error) {
            if (error?.response?.data) {
                const { data } = error.response;
                if (!data.success)
                    return setInvalidAdmin(data.error)
                return console.log(error.response.data)
            }
            console.log(error)
        }
    }

    if (success)
        return (<div className="max-w-screen-sm m-auto pt-40"
        >
            <h1 className="text-center text-3xl text-gray-500 mb-3">Password Reset Succeccfully</h1>
        </div>);

    if (invalidAdmin)
        return (<div className="max-w-screen-sm m-auto pt-40"
        >
            <h1 className="text-center text-3xl text-gray-500 mb-3">{invalidAdmin}</h1>
        </div>);

    if (busy)
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Changer Mot de passe</h1>
                <form onSubmit={handleSubmit} className="shadow w-full rounded-lg p-10">
                    {error &&
                        <p className="text-center p-2 mb-3 bg-red-500 text-white">{error}</p>}
                    <div className="space-y-8">
                        <input
                            type="password"
                            name='motdepasse'
                            placeholder="***********"
                            onChange={handleOnChange}
                            className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"

                        />
                        <input
                            type="password"
                            name="confirmermotdepasse"
                            onChange={handleOnChange}

                            placeholder="***********"
                            className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"

                        />
                        <input
                            type="submit"
                            value="Enregistrer"
                            placeholder="Sauvgarder"
                            className="bg-gray-500 w-full py-3 text-while rounded"

                        />

                    </div>
                </form>

            </div>
        )
}
