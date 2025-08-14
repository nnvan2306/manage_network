import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import Empty from "../../atoms/Empty";
import type { DeviceType } from "../../../types/device";

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: "small" | "medium" | "large" | "fullscreen";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
    headerActions?: React.ReactNode;
    handleSelectDevices: (devices: DeviceType[]) => void;
};

const Popup = ({
    isOpen,
    onClose,
    title,
    size = "large",
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = "",
    headerActions,
    handleSelectDevices,
}: PopupProps) => {
    const [devidesChecked, setDeviceChecked] = useState<DeviceType[]>([]);
    const [devices, setDevices] = useState<DeviceType[]>([
        {
            id: 1,
            networkId: 1,
        },
        {
            id: 2,
            networkId: 1,
        },
        {
            id: 3,
            networkId: 1,
        },
        {
            id: 4,
            networkId: 1,
        },
    ]);

    const handleCheck = (device: DeviceType) => {
        let newChecked = [];
        if (devidesChecked.find((a) => a.id === device.id)) {
            newChecked = devidesChecked.filter((i) => i.id !== device.id);
        } else {
            newChecked = [...devidesChecked, device];
        }
        setDeviceChecked(newChecked);
    };

    const handleSelect = useCallback(() => {
        handleSelectDevices(devidesChecked);
        onClose();
    }, [devidesChecked, handleSelectDevices, onClose]);

    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // Prevent body scroll when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className={`popup-container popup-${size} ${className}`}>
                {/* Header */}
                {(title || showCloseButton || headerActions) && (
                    <div className="popup-header">
                        <div className="popup-title-section">
                            {title && <h2 className="popup-title">{title}</h2>}
                        </div>
                        <div className="popup-header-actions">
                            {headerActions}
                            {showCloseButton && (
                                <button
                                    className="popup-close-button"
                                    onClick={onClose}
                                    aria-label="Close popup"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="popup-content">
                    <div className="content">
                        <div className="action_device">
                            <button
                                className="btn_add_device"
                                onClick={handleSelect}
                                disabled={devidesChecked.length === 0}
                            >
                                add
                            </button>
                        </div>
                        {devices.length === 0 ? (
                            <Empty />
                        ) : (
                            <div className="table">
                                <div className="table-header">
                                    <div className="th">Device Name</div>
                                    <div className="th">Actions</div>
                                </div>
                                {devices.map((device) => (
                                    <div key={device.id} className="table-row">
                                        <div className="td device-name">
                                            <strong>{device.id}</strong>
                                        </div>

                                        <div className="td actions">
                                            <input
                                                className="input_checkbox"
                                                type="checkbox"
                                                checked={devidesChecked.some(
                                                    (a) => a.id === device.id
                                                )}
                                                onChange={() =>
                                                    handleCheck(device)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
