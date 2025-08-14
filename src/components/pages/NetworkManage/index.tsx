import React, { useState } from "react";
import "./styles.css";
import Empty from "../../atoms/Empty";
import type { NetworkType } from "../../../types/network";
import type { DeviceType } from "../../../types/device";
import Popup from "../../organisms/Popup";

const NetworkManage: React.FC = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [networkEdit, setNetworkEdit] = useState<NetworkType | null>(null);
    const [devicesNew, setDevidesNew] = useState<DeviceType[]>([]);
    const [brokerId, setBrokerId] = useState<number>(0);
    const [networkes, setNetworkes] = useState<NetworkType[]>([
        { id: 1, ip: "1.1.1.1", brokerId: 1 },
    ]);

    const handleSearch = () => {};

    const handleSelectNetworkedit = (network: NetworkType) => {
        setNetworkEdit(network);
        setTextSearch(network.ip);
        setNetworkes([]);
    };

    const handleSelectDevices = (devices: DeviceType[]) => {
        setDevidesNew(devices);
    };

    return (
        <div className="network-manage">
            {/* Header */}
            <div className="header">
                <h1 className="title">Network Management</h1>

                <div className="constent_header">
                    <div className="form_search">
                        <input
                            type="text"
                            placeholder="Search devices by name, IP, or location..."
                            value={textSearch}
                            onChange={(e) =>
                                setTextSearch(e.target.value.trim())
                            }
                            className="search-input"
                        />
                        <button
                            className="btn btn_search"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>

                    <div className="" style={{ width: "100%" }}>
                        {networkes?.length ? (
                            <div className="table">
                                <div className="table-header">
                                    <div className="th">network Name</div>
                                    <div className="th">Actions</div>
                                </div>
                                {networkes.map((i) => (
                                    <div key={i.id} className="table-row">
                                        <div className="td device-name">
                                            <strong>{i.id}</strong>
                                        </div>

                                        <div className="td actions">
                                            <button
                                                className="btn edit-button"
                                                onClick={() =>
                                                    handleSelectNetworkedit(i)
                                                }
                                            >
                                                edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : networkEdit ? (
                            <div className="content">
                                {devicesNew.length === 0 ? (
                                    <div className="">
                                        <Empty />
                                        <div
                                            className=""
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                className="btn btn_add_device"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                Add Device
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div
                                            className=""
                                            style={{
                                                display: "flex",
                                                justifyContent: "end",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <button
                                                className="btn btn_save"
                                                disabled={brokerId === 0}
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <div
                                            className="table"
                                            style={{
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <div className="table-header">
                                                <div className="th">
                                                    Device Name
                                                </div>
                                                <div className="th">Broker</div>
                                            </div>
                                            {devicesNew.map((device) => (
                                                <div
                                                    key={device.id}
                                                    className="table-row"
                                                >
                                                    <div className="td device-name">
                                                        <strong>
                                                            {device.id}
                                                        </strong>
                                                    </div>

                                                    <div className="td actions">
                                                        <input
                                                            className="input_checkbox"
                                                            type="checkbox"
                                                            checked={
                                                                device.id ===
                                                                brokerId
                                                            }
                                                            onChange={() =>
                                                                setBrokerId(
                                                                    device.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className=""
                                            style={{
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <button
                                                className="btn btn_add_device"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                Add Device
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="newtwork_empty">
                                <Empty />
                                <button className="btn">new network</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Popup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                handleSelectDevices={handleSelectDevices}
            />
        </div>
    );
};

export default NetworkManage;
