const printReceipt = require('../main');

it ('print sample receipt', () => {
    expect(printReceipt([
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ])).toBe("***<store earning no money>Receipt ***\n"+
        "Name: Sprite, Quantity: 5 bottles, Unit price: 3.00 (yuan), Subtotal: 15.00 (yuan)\n"+
        "Name: Litchi, Quantity: 2 kg, Unit price: 15.00 (yuan), Subtotal: 30.00 (yuan)\n"+
        "Name: Noodles, Quantity: 3 bag, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)\n"+
        "----------------------\n"+
        "Total: 54.00 (yuan)\n"+
        "Saving: 4.50 (yuan)\n"+
        "**********************");
});