import { Directive, Input, Output, EventEmitter, OnInit, TemplateRef, ViewContainerRef , ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({ selector: '[myOnlyNumbers]' })
export class OnlyNumbersDirective {
    constructor(el: ElementRef) { }

    @HostListener('keypress', ['$event']) onKeyDown(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            event.preventDefault();              
    }
}

@Directive({ selector: '[myActiveCapsLock]'})
export class ActiveCapsLock {
    @Output()
    public capsLock = new EventEmitter();

    constructor(el: ElementRef) { }    

    @HostListener('keypress', ['$event']) onKeyDown(event) {
        var kc = event.keyCode ? event.keyCode : event.which;
        var sk = event.shiftKey ? event.shiftKey : ((kc == 16) ? true : false);

        if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk))
            this.capsLock.emit(true);
        else
            this.capsLock.emit(false);
    }
}

@Directive({selector: '[myOnlyNumbersMessage]'})
export class OnlyNumbersMessage{
    @Output()
    public digitString = new EventEmitter();

    constructor(el: ElementRef) { }    

    @HostListener('keypress', ['$event']) onKeyDown(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)){
            this.digitString.emit(true);
        }else{
            this.digitString.emit(false);
        }
                          
    }
}

@Directive({ selector: '[decimals]' })
export class decimalsDirective{
    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef) { 
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('keypress', ['$event']) onKeyDown(event) {
        var valor = this.el.value;
        var charCode = (event.which) ? event.which : event.keyCode;
    }
}

@Directive({ 
    selector: '[BgmMask]',
    providers: [{
        provide: NG_VALUE_ACCESSOR, 
        useExisting: BgmMaskDirective, 
        multi: true 
    }]
})
export class BgmMaskDirective implements ControlValueAccessor{
    onTouched: any;
    onChange: any;

    @Input('BgmMask') BgmMask: string;

    writeValue(value: any): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event']) 
    onKeyup($event: any) {
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.BgmMask.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);
    
        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }
    
        if (valor.length <= pad.length) {
            this.onChange(valor);
        }
    
        var valorMaskPos = 0;
        valor = '';

        for (var i = 0; i < this.BgmMask.length; i++) {
            if (isNaN(parseInt(this.BgmMask.charAt(i)))) {
                valor += this.BgmMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }
        
        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }
    
        $event.target.value = valor;
    }

    @HostListener('blur', ['$event']) 
    onBlur($event: any) {
        // Limpa os campos se for menor que a mascara
        // if ($event.target.value.length === this.BgmMask.length) {
        //     return;
        // }
        // this.onChange('');
        // $event.target.value = '';
    }
}


@Directive({
  selector: '[BgmMaskCurrency]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: BgmMaskCurrencyDirective, 
    multi: true 
  }]
})
export class BgmMaskCurrencyDirective implements ControlValueAccessor, OnInit {

  onTouched: any;
  onChange: any;

  separadorDecimal: string;
  separadorMilhar: string;
  prefixo: string;

  @Input('BgmMaskCurrency') BgmMask: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.separadorDecimal = this.BgmMask.decimal || ',';
    this.separadorMilhar = this.BgmMask.milhar || '.';
    this.prefixo = this.BgmMask.prefixo || '';
  }

  writeValue(value: any): void {
    if (value) {
      if (!isNaN(value)) {
        value = value.toFixed(2);
      }
      this.el.nativeElement.value = this.aplicarMascara(String(value));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {

    let valor: string = this.aplicarMascara($event.target.value);

    if (valor === '') {
      this.onChange('');
      $event.target.value = '';
      return;
    }

    if (this.separadorDecimal === ',') {
      this.onChange(valor.replace(/\./g, '').replace(',', '.'));
    } else {
      this.onChange(valor.replace(/\,/g, ''));
    }

    $event.target.value = valor;
  }

  @HostListener('blur', ['$event']) 
  onBlur($event: any) {
    var pattern = '0' + this.separadorDecimal + '00';
    if ($event.target.value.indexOf(pattern) === -1) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valorConverter
   * @return string
   */
  aplicarMascara(valorConverter: string): string {
    let valorNum = parseInt(valorConverter.replace(/\D/g, ''), 10);
    let valorMask = '';
    let valor: string;

    if (isNaN(valorNum)) {
      return '';
    }

    valor = valorNum.toString();
    switch (valor.length) {
       case 1:
         valorMask = '0' + this.separadorDecimal + '0' + valor;
         break;
       case 2:
         valorMask = '0' + this.separadorDecimal + valor;
         break;
       case 3:
         valorMask = valor.substr(0, 1) + this.separadorDecimal + valor.substr(1, 2);
         break;
       default:
         break;
     }

    if (valorMask === '') {
      let sepMilhar = 0;
      for (let i = (valor.length - 3); i >= 0; i--) {
        if (sepMilhar === 3) {
          valorMask = this.separadorMilhar + valorMask;
          sepMilhar = 0;
        }
        valorMask = valor.charAt(i) + valorMask;
        sepMilhar++;
      }
      valorMask = valorMask + this.separadorDecimal + 
        valor.substr(valor.length - 2, 2);
    }

    if (this.prefixo !== '') {
      valorMask = this.prefixo + ' ' + valorMask;
    }
    
    return valorMask;
  }

}