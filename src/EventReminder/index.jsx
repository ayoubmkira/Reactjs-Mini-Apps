import { useEffect, useState } from "react";
import { v4 as uuidv4} from "uuid";
import { FaCalendarDay, FaTimes } from "react-icons/fa";
import { useLocalStorage } from "react-use-storage";
import "./style.css";

const calculateDifference = (date) => {
    return new Date(date).getTime() - new Date().getTime();
};
const addZero = (value) => {
    return (String(value).length === 1)? "0" + value: value;
};

export default function EventReminder() {

    const [value, setValue] = useLocalStorage("events-reminder", []);
    const [forceUpdateKey, setForceUpdateKey] = useState(0);
    const [eventTitle, setEventTitle] = useState("");
    const [dateTime, setDateTime] = useState(new Date());
    const [listEvents, setListEvents] = useState(value);
    const [hideDoneEvents, setHideDoneEvents] = useState(true);

    const handleAddDate = () => {
        let difference = calculateDifference(dateTime);
        setListEvents(currEvents => {
            return [...currEvents, {
                id: uuidv4(),
                title: eventTitle || "Event",
                date: new Date(dateTime),
                done: difference < 0
            }]
        });
    };

    const calculateTimeToEvent = (event) => {
        let difference = calculateDifference(event.date);

        // Check every second If the Event time is Done.
        if(difference <= 0) {
            setListEvents(currEvents => {
                return currEvents.map(_event => {
                    return _event.id === event.id? {..._event, done: true}: _event;
                })
            });
        }

        // Convert the difference to days, hours, minutes, and seconds:
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        difference -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * (1000 * 60);

        const seconds = Math.floor(difference / 1000);

        return { days: addZero(days), hours: addZero(hours), minutes: addZero(minutes), seconds: addZero(seconds) };

    };

    const handleRemoveEvent = (eventId) => {
        setListEvents((currEvents) => {
            return currEvents.filter(event => event.id !== eventId);
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setForceUpdateKey(v => v + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [forceUpdateKey]);

    useEffect(() => {
        setValue(listEvents);
    }, [listEvents]);

    let filteredArray = (hideDoneEvents)? listEvents.filter(event => !event.done): listEvents;

    return <section className="section-event-reminder">
        <div className="section-event-reminder__container">
            <div className="event-form">
                <input
                    className="event-form__time-input"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)} />
                <input
                    className="event-form__title-input"
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)} />
                <button
                    className="event-form__add-button"
                    onClick={handleAddDate}>Add Event</button>
            </div>
            <div className="event-show-hide">
                <input
                    id="hide-done-events"
                    type="checkbox"
                    checked={hideDoneEvents}
                    onChange={() => setHideDoneEvents(!hideDoneEvents)} />
                <label htmlFor="hide-done-events">Hide done Events.</label>
            </div>

            <div className="list-events">
                {
                    filteredArray.map((event, i) => {
                        const dateResult = event.done? { days: "00", hours: "00", minutes: "00", seconds: "00" }: calculateTimeToEvent(event);
                        
                        return <div key={i} className={`event-card event-card${event.done? "-done": ""}`}>
                            <div className="event-card__btn__close" onClick={() => handleRemoveEvent(event.id)}>
                                <FaTimes />
                            </div>
                            <h2 className="event-card__title">
                                {event.title}
                            </h2>
                            <div className="event-card__time">
                                <div className="event-card__time__header">
                                    <div className="event-card__time__column">
                                        <h2 className="event-card__time__column__value">{dateResult.days}</h2>
                                        <h4 className="event-card__time__column__text">Days</h4>
                                    </div>
                                    <span className="event-card__time__dots">:</span>
                                    <div className="event-card__time__column">
                                        <h2 className="event-card__time__column__value">{dateResult.hours}</h2>
                                        <h4 className="event-card__time__column__text">Hours</h4>
                                    </div>
                                    <span className="event-card__time__dots">:</span>
                                    <div className="event-card__time__column">
                                        <h2 className="event-card__time__column__value">{dateResult.minutes}</h2>
                                        <h4 className="event-card__time__column__text">Minutes</h4>
                                    </div>
                                    <span className="event-card__time__dots">:</span>
                                    <div className="event-card__time__column">
                                        <h2 className="event-card__time__column__value">{dateResult.seconds}</h2>
                                        <h4 className="event-card__time__column__text">Seconds</h4>
                                    </div>
                                </div>
                                <div className="event-card__time__footer">
                                    <div>
                                        <FaCalendarDay className="icon" />
                                        <span className="text">Event: {String(new Date(event.date).toUTCString())}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </section>;

}