import React, { Component, useMemo } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { TextInput, EmailInput, Select } from '../../modules/form'
import { toast } from 'react-toastify'
import { useForm } from "react-form"
import { getUser, saveUser } from '../../../client/user'

function EditUserForm({ defaultValues, onSave }) {
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: (values) => {
            if (onSave) {
                onSave(values).then((res) => {
                    console.log(res);
                });
            }
        },
        defaultValues: useMemo(() => { return { ...defaultValues } }, [defaultValues])
    });

    if (isSubmitting) {

    }

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
                    <TextInput name="category" displayName="Category" placeholder="Category" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <TextInput name="firstYear" displayName="First Year" placeholder="First Year" type="number" />
                </div>
                <div className="form-group col-md-2">
                    <TextInput name="graduationYear" displayName="Graduation Year" placeholder="Graduation Year" type="number" />
                </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={!canSubmit}>Submit</button>
        </Form>
    )
}

export class EditUser extends Component {

    state = {
        editUser: {},
        loaded: false,
        error: null
    }

    componentDidMount = () => {
        if (this.props.match) {
            const id = this.props.match.params.id;
            if (id !== "new") {
                getUser(id).then((r) => r.json())
                    .then((res) => {
                        if (res.error) {
                            this.setState({
                                error: res.error
                            })
                        } else {
                            this.setState({
                                editUser: res,
                                loaded: true
                            })
                        }
                    });
            }
        }
    }

    handleFormOnSave = (user) => {
        let id = this.props.match.params.id;
        if (id === "new") id = null;
        return saveUser(id, user).then((r) => r.json());
    }

    render() {
        if (this.state.error) {
            toast.error(this.state.error)
        }

        return (
            <div className="container">
                <h3>Edit user</h3>
                <div className="row">
                    <div className="col">
                        {this.state.loaded ?
                            <EditUserForm className="mt-lg-4" defaultValues={this.state.editUser} onSave={this.handleFormOnSave} />
                            :
                            <div className="text-center mt-2">
                                {
                                    this.state.error ?
                                        <h5><span className="badge badge-danger">{this.state.error}</span></h5>
                                        :
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(EditUser)
