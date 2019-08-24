import React, {Component} from 'react';
// import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        maxPrice: 0,
        minPrice: 0,
        maxSize: 0,
        minSize: 0,
        breakfast: false,
        pets: false,
    };

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortRoom',
                order: 'sys.createdAt'
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms,
                sortedRooms: rooms,
                featuredRooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize,
            })

        } catch (e) {
            console.log(e)
        }
    };

    componentDidMount() {
        this.getData();
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        let room = tempRooms.find(room => room.slug === slug);
        return room;
    };
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        }, this.filterRooms)
    };
    filterRooms = () => {
        let { rooms, type, capacity, pets, breakfast, price, minSize, maxSize } = this.state;
        let tempRooms = [...rooms];
        if(type !== 'all') {
            tempRooms = tempRooms.filter(item => item.type === type)
        }
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(item => item.capacity >= capacity)
        }
        tempRooms = tempRooms.filter(item => item.price <= price);
        tempRooms = tempRooms.filter(item => item.size >= minSize && item.size <= maxSize);
        if(breakfast) tempRooms = tempRooms.filter(item => item.breakfast === true);
        if(pets) tempRooms = tempRooms.filter(item => item.pets === true);
        this.setState({
            sortedRooms: tempRooms,
        })
    };
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => {
                    return (
                        <Component {...props} context={value} />
                    )
                }}
            </RoomConsumer>
        )
    }
}

export { RoomProvider, RoomConsumer, RoomContext };