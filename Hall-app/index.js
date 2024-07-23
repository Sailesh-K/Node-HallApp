const express = require('express')
const app = express()
const port = 3000

const rooms=[];
const booking=[];

//Create Rooms
app.post('/create-room', (req, res) => {
  const room={
    nos:req.query.nos,
    id:rooms.length+1,
    price:req.query.price,
    amenities:['AC','Food and Beverages'],
    avail:'Available'
};
  rooms.push(room);
  res.json({capacity:room.nos,pricehr:room.price,roomId:room.id,bookingstatus:room.avail});
});

//Book-Rooms
app.post('/book-room', (req, res) => {
    const book={
        name:req.query.name,
        date:req.query.date,
        start:req.query.start,
        end:req.query.end,
        bookId:req.query.bookId,
        bookStatus:'Booked',
        bookStatus:'Available'
    };

    booking.push(book);
    res.json(book);
});

//Get Room Details
app.get('/room', (req, res) => {
    const roomData=rooms.map(room=>{
        const roomInfo={
            roomName:`Room ${room.id}`,
            bookedStatus:'Available'
        };

        booking.forEach(book=>{
            if(book.bookId===room.Id){
                roomInfo.bookedStatus = 'Booked';
                roomInfo.customerName = book.name;
                roomInfo.date = book.date;
                roomInfo.startTime = book.start;
                roomInfo.endTime = book.end;
            }
        });
        return roomInfo;
    });
    res.json(roomData);
});

//Get Customer Details
app.get('/customer',(req,res)=>{
    const customerData=booking.map(book=>({
        customerName: book.name,
        roomName: `Room ${book.bookId}`,
        date: book.date,
        startTime: book.start,
        endTime: book.end
    }));
    res.json(customerData);
});

//Get Customer Booking Details
app.get('/customer/:customerName/bookings',(req,res)=>{
    const customerName=req.params.customerName;
    const customerBookings=booking.filter(book=>book.name===customerName);

    res.json(customerBookings);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});