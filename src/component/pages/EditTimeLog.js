import React, { Component, useMemo, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { TextInput, DateTimeInput } from '../modules/form'
import { getTimeLog, saveTimeLog, deleteTimeLog } from '../../client/timeLog'
import { toast } from 'react-toastify'
import { useForm } from 'react-form'

function EditTimeLogForm({ defaultValues, onSave, onDelete }) {
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: onSave,
        defaultValues: useMemo(() => { return { ...defaultValues } }, [defaultValues])
    });

    return (
        <Form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextInput name="Id" displayName="Id" placeholder="New Id" disabled={true} />
                </div>
                <div className="form-group col-md-4">
                    <TextInput name="userId" placeholder="User" displayName="User Id" required={true} />
                </div>
                <div className="form-group col-md-4">
                    <TextInput name="seasonId" placeholder="Season" displayName="Season Id" required={true} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-4">
                    <DateTimeInput name="timeIn" displayName="Time In" required={true} />
                </div>
                <div className="form-group col-md-4">
                    <DateTimeInput name="timeOut" displayName="Time Out" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-8">
                    <button className="btn btn-primary btn-block" type="submit" disabled={!canSubmit || isSubmitting}>Submit</button>
                </div>
                <div className="form-group col-md-4">
                    <button className="btn btn-danger btn-block" type="button" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </Form>
    )
}

export class EditTimeLog extends Component {

    state = {
        editTimeLog: {},
        error: null,
        loaded: false
    }

    componentDidMount = () => {
        if (this.props.match) {
            const id = this.props.match.params.id;
            if (id !== "new") {
                getTimeLog(id).then((r) => r.json())
                    .then((res) => {
                        if (res.error) {
                            this.setState({
                                error: res.error
                            })
                        } else {
                            this.setState({
                                editTimeLog: res,
                                loaded: true
                            })
                        }
                    });
            }
        }
    }

    handleFormOnSave = (timeLog) => {
        let id = this.props.match.params.id;
        if (id === "new") id = null;

        let toastId = toast("Saving...", { autoClose: false });

        return saveTimeLog(id, timeLog).then((r) => r.json())
            .then((res) => {
                if (res.error) {
                    toast.update(toastId, { type: toast.TYPE.ERROR, autoClose: 5000, render: res.error })
                } else {
                    toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Done" })
                }

                return Promise.resolve(res);
            });
    }

    handleFormOnDelete = () => {
        let id = this.props.match.params.id;
        if (id === "new") id = null;

        let toastId;

        toast(
            <Fragment>
                Confirm to delete?{" "}
                <button className="btn btn-sm btn-outline-danger" onClick={() => {
                    toastId = toast("Deleting...", { autoClose: false })
                    deleteTimeLog(id).then((r) => {
                        if (r.ok && (r.status >= 200 && r.status < 300)) {
                            toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "Done", autoClose: 5000 })
                            this.props.history.push("/timeLogs");
                        }
                    })
                }}>Yes</button>
                {" "}
                <button className="btn btn-sm btn-outline-secondary">No</button>
            </Fragment>
        )
    }

    render() {
        if (this.state.error) {
            toast.error(this.state.error);
        }

        return (
            <div className="container">
                <h3>Edit timeLog</h3>
                <div className="row justify-content-lg-center">
                    <div className="col col-lg-10">
                        {
                            this.state.loaded ? <EditTimeLogForm className="mt-lg-4" defaultValues={this.state.editTimeLog}
                                onSave={this.handleFormOnSave}
                                onDelete={this.handleFormOnDelete} /> :
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

export default withRouter(EditTimeLog)
