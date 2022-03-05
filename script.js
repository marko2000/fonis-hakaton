const c = document.getElementById('canvas');
const ctx = c.getContext('2d'); // ova promenjiva se koristi da bi nacrtali canvas u 2D

const createTriangle = (position, edge) => {
    ctx.beginPath();
    ctx.moveTo(...position); // idi na levo teme
   
    // (0,0) u canvas-u je gornji levi cosak
    ctx.lineTo(position[0] + edge / 2, position[1] - edge * Math.sin(Math.PI / 3)); // nacrtaj liniju od levog do gornjeg temena
    ctx.lineTo(position[0] + edge, position[1]); // nacrtaj liniju od gornjeg do desnog temena
    ctx.lineTo(...position); // nacrtaj liniju od levog do desnog temena
    ctx.closePath();
    ctx.fillStyle='blue'
    ctx.fill(); // popuni trougao plavom bojom
  };

  const createSierpinskiTriangle = (position, edge, depth) => {
    const innerTriangleEdge = edge / 2; // ivica unutrasnjeg torugla je polovina ivice spoljasnjeg trougla
    
    const innerTrianglesPositions = [
      position,
      [position[0] + innerTriangleEdge, position[1]],
      [position[0] + innerTriangleEdge / 2, position[1] - Math.sin(Math.PI / 3) * innerTriangleEdge],
    ];
    if (depth === 0) {//uslov za izlazak iz rekurzije
    
      innerTrianglesPositions.forEach((trianglePosition) => {
        createTriangle(trianglePosition, innerTriangleEdge);
      });
    } else {
      innerTrianglesPositions.forEach((trianglePosition) => {
        createSierpinskiTriangle(trianglePosition, innerTriangleEdge, depth - 1);
      });
    }
  };

  createSierpinskiTriangle([0,800],800,5)
