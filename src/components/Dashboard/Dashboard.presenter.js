import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import isEmpty from 'lodash/isEmpty'
import {CardView, UserDetailRow} from '@m3dicine/core'
import GGMapDash from "sharedComponents/GoogleMapDashboard";
import {AppConfig} from 'configuration'

export default class Presenter {
    loadDoughnut = (data) => {
        if (!isEmpty(data)) {
            return (
                <div className="innerChart">
                    <Doughnut className="dough" data={data} width={150} height={150}
                              options={{
                                  maintainAspectRatio: true,
                                  cutoutPercentage: 80,
                                  legend: {display: false},
                                  tooltips: {enabled: true}
                              }}/>
                </div>);
        }
    }

    loadUserDetails = (props, user, clinicName) => {
        let userDetails = user ? user : '--';
        let firstName = userDetails.firstName || '--';
        let lastName = userDetails.lastName || '--';
        return (<div>
            <CardView>
                <div
                    className="withHalo">{AppConfig.dashboard.labels['82161cfb-d6b3-4c6d-984c-8be199fc12e3'].translate}
                    {firstName + " " + lastName}
                </div>
                <div>
                    <UserDetailRow
                        underline={true}
                        title={{
                            class: props.dashboardCardTitle,
                            value: AppConfig.dashboard.labels['ca74a97d-ab67-4163-949a-3d4f86c24d20'].translate
                        }}
                        detail={{class: props.dashboardCardTitle, value: userDetails.email || '--'}}/>
                    <UserDetailRow
                        underline={true}
                        title={{
                            class: props.dashboardCardTitle,
                            value: AppConfig.dashboard.labels['b8b9ffbf-a016-426e-8a2a-ef45e57af63c'].translate
                        }}
                        detail={{class: props.dashboardCardTitle, value: userDetails.phoneNumber || '--'}}/>
                    <UserDetailRow
                        underline={true}
                        title={{
                            class: props.dashboardCardTitle,
                            value: AppConfig.dashboard.labels['0fb64e06-828d-4589-bc9d-017418affa08'].translate
                        }}
                        detail={{class: props.dashboardCardTitle, value: clinicName || '--'}}/>
                </div>
            </CardView>
        </div>);
    }

    loadGMap = (orphanSamples, assignSamples) => {
        const coords = [];
        const gMapCoords = [];
        if (orphanSamples && assignSamples) {
            for (let i in orphanSamples) {
                let {id, geoData, url, sampleName} = orphanSamples[i];
                if (!geoData) continue;
                coords.push({
                    type: false,
                    geoData: geoData.lonlat,
                    url,
                    sampleName,
                    sampleId: id,
                    sample: {...orphanSamples[i], sampleId: id}
                });
            }
            for (let i in assignSamples) {
                let {id, sampleOf, geoData, url, sampleName} = assignSamples[i];
                if (!geoData) continue;
                coords.push({
                    type: true,
                    geoData: geoData.lonlat,
                    url,
                    sampleName,
                    sampleId: id,
                    patientId: sampleOf,
                    sample: {...assignSamples[i], sampleId: id}
                });
            }
        }
        for (let index in coords) {
            let {geoData, type, sampleName, url, sampleId, patientId, sample} = coords[index];
            let pos = {
                coor: {lat: Number(geoData.lat), lng: Number(geoData.lon)}, isMyFile: type,
                sampleUrl: url, sampleName, sampleId, patientId, sample
            };
            gMapCoords.push(pos)
        }
        return (<GGMapDash coordinates={gMapCoords}/>)
    }

    loadSampleStats = (props, orphanSamples, assignSamples) => {
        const orphanCount = Object.keys(orphanSamples).length > 0 ? Object.keys(orphanSamples).length : 0;
        const assignedCount = Object.keys(assignSamples).length > 0 ? Object.keys(assignSamples).length : 0;
        const tempCount = assignedCount + orphanCount;
        const totalRecordingsCount = tempCount > 0 ? tempCount : '0';

        const data = {
            labels: [AppConfig.dashboard.labels['90016e60-98af-4b79-9e1e-2f3c07abcb5c'].translate, AppConfig.dashboard.labels['ffa435a1-88f1-4981-b6f7-da08cf920f37'].translate],
            datasets: [{
                label: '# of Samples',
                data: [orphanCount, totalRecordingsCount - orphanCount],
                backgroundColor: ['#f5a623', '#8bc34a'],
                borderWidth: 0
            }]
        };
        return (<CardView>
            {AppConfig.dashboard.labels['0c2b4992-8b35-400f-8ba5-087952831c4d'].translate}
            <div className="sampleStats">
                <div className="stats">
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels['ba07c2ef-10f6-4a96-87a3-76434a2d1863'].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: totalRecordingsCount}}/>
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels['90016e60-98af-4b79-9e1e-2f3c07abcb5c'].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: orphanCount}}/>
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels['ffa435a1-88f1-4981-b6f7-da08cf920f37'].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: assignedCount}}/>
                </div>
                <div className="chart">{this.loadDoughnut(data)}</div>
            </div>
        </CardView>);
    }

    loadVetOrProStats = (props, own, shared) => {
        let ownerCount, sharedPetOwnerCount, petCount;
        ownerCount = own ? own : 0;
        sharedPetOwnerCount = shared ? shared : 0;
        petCount = own + shared > 0 ? own + shared : '0';

        const data = {
            labels: [AppConfig.dashboard.labels['4f0b0140-0e09-4085-bb7b-0cc38bdfa5fc'].translate, AppConfig.dashboard.labels['ca3830bd-ad92-4fe6-ad19-0f0de0bfd379'].translate],
            datasets: [{
                label: '# of Patients',
                data: [ownerCount, sharedPetOwnerCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderWidth: 0
            }]
        };

        return (<CardView>
            <p>{AppConfig.dashboard.labels['06b7682d-1cf3-44fd-806e-6ceccb4029d4'].translate}</p>
            <div className="sampleStats">
                <div className="stats">
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels["948a54d9-20bc-4173-8355-020ac2d313e6"].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: petCount}}/>
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels["4f0b0140-0e09-4085-bb7b-0cc38bdfa5fc"].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: ownerCount}}/>
                    <UserDetailRow underline={true}
                                   title={{
                                       class: props.dashboardCardTitle,
                                       value: AppConfig.dashboard.labels["ca3830bd-ad92-4fe6-ad19-0f0de0bfd379"].translate
                                   }}
                                   detail={{class: props.dashboardCardTitle, value: sharedPetOwnerCount}}/>
                </div>
                <div className="chart">{this.loadDoughnut(data)}</div>
            </div>
        </CardView>);
    }
}
