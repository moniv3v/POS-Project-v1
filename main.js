'use strict';

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
    }
  ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
function countNumberOfItem(cart) {
    let cartObject = [];
    cart.filter(element => {
        var exist = false;
        cartObject.filter(objElement => {
            if (objElement.barcode == element) {
                objElement.count = objElement.count + 1;
                exist = true;
            }
        });
        if (!exist) {
            if (element.includes('-')) {
                let elementStr = element.split('-');
                cartObject.push({ "barcode": elementStr[0], "count": parseInt(elementStr[1]) });
            } else {
                cartObject.push({ "barcode": element, "count": 1 });
            }
        }
    });
    return cartObject;
}

function calculateDiscount(cartObject, fn) {
    cartObject.forEach(element => {
        fn[0].barcodes.forEach(element2 =>{
            if(element.barcode == element2){
                element.countAfterDiscount=Math.floor(element.count/3*2);
            }else{
                element.countAfterDiscount = element.count;
            }
        });
    });
    return cartObject;
}

function getSavingMoney(cartObject){
    let saved = 0;
    cartObject.forEach(element=>{
        saved = saved + (element.price*element.count)-(element.price*element.countAfterDiscount);
    });
    
    return saved;
}

function getTotal(cartObject){
    let total = 0;
    cartObject.forEach(element=>{
        total = total + element.price*element.countAfterDiscount;
    });
    return total;
}
 

function generateReceipt(cartObject,fn){
    cartObject.forEach(cartElement=>{
        fn.forEach(allElement=>{
            if(cartElement.barcode==allElement.barcode){
                cartElement.price = allElement.price;
                cartElement.unit = allElement.unit;
                cartElement.name = allElement.name;
                if(cartElement.unit == 'bottle' && cartElement.count >1){
                    cartElement.unit = 'bottles';
                }
            }
        });
    });
    let result = "***<store earning no money>Receipt ***\n";
    cartObject.forEach(cartElement=>{
        result = result+"Name: "+cartElement.name+", Quantity: "+cartElement.count+" "+cartElement.unit+", Unit price: "+cartElement.price.toFixed(2)+" (yuan), Subtotal: "+(cartElement.countAfterDiscount*cartElement.price).toFixed(2)+" (yuan)\n";
    });
    result = result+"----------------------\n";
    result = result+"Total: "+getTotal(cartObject).toFixed(2)+" (yuan)\n";
    result = result+"Saving: "+getSavingMoney(cartObject).toFixed(2)+" (yuan)\n";
    result = result+"**********************";
    return result;
}

function printReceipt(cart) {
    return generateReceipt(calculateDiscount(countNumberOfItem(cart), loadPromotions()),loadAllItems());

}



module.exports = printReceipt;