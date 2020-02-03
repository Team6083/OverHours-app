import React, { Component, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TextInput, EmailInput, Select } from '../../modules/form'
import { useForm } from "react-form";

function EditUserForm({ defaultValues }) {
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: (values) => { console.log(values) },
        debugForm: true,
        defaultValues: useMemo(() => { return { ...defaultValues } }, [])
    });

    return (
        <Form>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <TextInput inputGroup={
                        {
                            prepend: <span className="input-group-text">@</span>
                        }
                    } name="userName" displayName="User Name" placeholder="Username" required={true} />
                </div>
                <div className="form-group col-md-3">
                    <TextInput name="name" displayName="Name" placeholder="Name" required={true} />
                </div>
                <div className="form-group col-md-6">
                    <EmailInput name="email" placeholder="Email" displayName="Email" required={true} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Password</label>
                    <Link className="badge badge-pill badge-info d-block" to="/users/changePassword/">Click here to change password</Link>
                </div>
                <div className="form-group col-md-3">
                    <input type="checkbox" id="editPasswordNeedChange" name="passwordNeedChange" placeholder="Password Need Change" />{" "}
                    <label htmlFor="editPasswordNeedChange">Password Need Change</label>
                </div>
                <div className="form-group col-md-3">
                    <Select name="permissionLevel" displayName="Permission Level" options={[
                        {
                            name: "Member",
                            value: 0
                        },
                        {
                            name: "Leader",
                            value: 1
                        },
                        {
                            name: "Admin",
                            value: 2
                        },
                        {
                            name: "Super",
                            value: 3
                        }
                    ]} />
                </div>
                <div className="form-group col-md-3">
                    <TextInput name="category" displayName="Category" placeholder="Category" required={true} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <TextInput name="firstYear" displayName="First Year" placeholder="First Year" type="number" required={true} />
                </div>
                <div className="form-group col-md-2">
                    <TextInput name="graduationYear" displayName="Graduation Year" placeholder="Graduation Year" type="number" required={true} />
                </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={!canSubmit}>Submit</button>
        </Form>
    )
}

export class EditUser extends Component {

    state = {
    }

    render() {

        return (
            <div className="container">
                <h3>Edit user</h3>
                <div className="row">
                    <div className="col">
                        <EditUserForm className="mt-lg-4" />
                    </div>
                </div>
            </div >
        )
    }
}

export default EditUser
