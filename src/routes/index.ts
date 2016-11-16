/**
 * Created by johan on 11/11/2015.
 */
/*
 * GET home page.
 */
export function index(req, res) {
    // res.render('index', { title: 'Express' });
    res.send(`<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.5.1/socket.io.js"></script>
<script>
    var socket = io.connect('http://localhost:8888');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
    });
</script>`);
};