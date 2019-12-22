import React, {Suspense, Component} from "react";
import {FirebaseFunctions} from '../../firebaseSetup';
// import Presenter from "./Dashboard.presenter"
// import {withRouteCheck} from "hoc/withRouteCheck";
// import {Loader, NOTIFICATION_FAIL} from '@m3dicine/core'
// import {withStyles} from '@material-ui/core/styles';
// import {dashboardStyle} from 'material-styles';
// import isEmpty from 'lodash/isEmpty'
// import {httpFlags, STATUS_200, STATUS_500} from "firebaseInteractorUtils/flagHelper";
// import ErrorBoundary from "ErrorBoundary";

// if (process.env.WEBPACK) require("./index.scss");

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: null,
            assignSamples: {},
            orphanSamples: {},
            loading: true,
            clinicName: ''
        };
        // this.Presenter = new Presenter();
    }

    async componentDidMount() {
        const dashboardUrl = FirebaseFunctions.httpsCallable('pro_get_samples_for_dashboard');
        console.log('afterwards?')
        console.log(await dashboardUrl());
       /* const res = await this.props.context.actions.DashboardAction.fetchDashboardData();
        switch (res.status) {
            case STATUS_200:
                this.setState({
                    assignSamples: res.message.assignSamples,
                    orphanSamples: res.message.orphanSamples,
                    loading: false
                });
                break;
            case STATUS_500:
                this.setState({loading: false});
        }
        this.setState({userDetail: this.props.context.fbDBUser});
        this.props.context.actions.ClinicAction.fetchDoctorData(this.props.context.fbAuthUser.uid, snap => this.setState({clinicName: snap.clinicName}));
        this.props.context.actions.PatientAction.fetchDoctorPatient(this.props.context.fbAuthUser.uid, doctorPatient => this.setState({doctorPatient: Object.keys(doctorPatient).length}));
        this.props.context.actions.PatientAction.fetchDoctorSharedPatient(this.props.context.fbAuthUser.uid, doctorSharedPatient => this.setState({doctorSharedPatient: Object.keys(doctorSharedPatient).length}));
        */
    }

 /*   renderUserDetails = () => this.Presenter.loadUserDetails(this.props.classes, this.state.userDetail, this.state.clinicName)
    renderVetorProStats = () => this.Presenter.loadVetOrProStats(this.props.classes, this.state.doctorPatient, this.state.doctorSharedPatient)

    renderGMap = () => {
        const orphanSamples = isEmpty(this.state.orphanSamples) ? {} : this.state.orphanSamples;
        const assignSamples = isEmpty(this.state.assignSamples) ? {} : this.state.assignSamples;
        return this.Presenter.loadGMap(orphanSamples, assignSamples);
    }

    renderSampleStats = () => {
        const orphanSamples = isEmpty(this.state.orphanSamples) ? {} : this.state.orphanSamples;
        const assignSamples = isEmpty(this.state.assignSamples) ? {} : this.state.assignSamples;
        return this.Presenter.loadSampleStats(this.props.classes, orphanSamples, assignSamples);
    }*/

    render() {
        // console.log(screen.availWidth)
        /*if (this.state.loading) return (<div className="loader_navbar"><Loader context={'Please Wait'}/></div>);
        return (<ErrorBoundary>
            <div className="dashboard__container">
                <div className="welcomeMessage">{this.renderUserDetails()}</div>
                <div className="title1">{this.renderSampleStats()}</div>
                <div className="title2">{this.renderVetorProStats()}</div>
                <div className="dashboard_map">{this.renderGMap()}</div>
            </div>
        </ErrorBoundary>);*/
        return <div>..?</div>
    }
}

export default Dashboard;
