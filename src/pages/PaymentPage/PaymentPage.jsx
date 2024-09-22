import React, { useEffect } from 'react'
import s from './PaymentPage.module.sass'
import Questions from '../../components/Questions/Questions';

function PaymentPage() {

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const payment = (price) => {
        const script = document.createElement('script');
        script.src = 'https://js.fortebank.com/widget/be_gateway.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const payment = () => {
                const params = {
                    checkout_url: "https://securepayments.fortebank.com",
                    checkout: {
                        iframe: true,
                        test: true,
                        transaction_type: "payment",
                        public_key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvIeU9CjZ/6cedPKYw3DnUljSdA3Qx75ysisIDTzMxaPNFBN9WuRhPq6TBAoibwclVZuQ5CLWSj4SOY3ifUtzF22DCUUt+XoceVS0dl9HG7HfVOxv+tD/zzP86N+yyjNiJl7sY48TcNzjSoqdQGIL+YAqGJpi3x+5UuXQI1x3XbGTpzhe20BPHMMx4Jpr8T04v0R+KabNTDrPUVBvCEFafXEW5hVoDVb27QfdKyrR2kwfMmaIVl/IcS6GXArWX9EMwmTqMUtNQBeI+VJSokmsZbVAhz5Zypr59vs2GjoPQYa3owJNBKFqV3tGLG5DFNv/Qeb8Kr+f7qWMiAnvGp4jhQIDAQAB",
                        order: {
                            amount: price,
                            currency: "KZT",
                            description: "Payment description",
                            tracking_id: "my_transaction_id"
                        },
                    },
                    closeWidget: function(status) {
                        console.debug('close widget callback', status);
                    }
                };
                new window.BeGateway(params).createWidget();
            };

            // Trigger payment function when needed
            payment();
        };

        return () => {
            document.body.removeChild(script);
        };
    };

  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
        <div className={s.title}>ПОПОЛНЕНИЕ БАЛАНСА</div>
        <div className={s.packets}>
            <div className={s.packet}>
                <div className={s.price}>100 000 ТЕНГЕ</div>
                <div className={s.value}>1 номинация</div>
                <button onClick={() => payment(1000)}>ПОПОЛНИТЬ</button>
            </div>
            <div className={s.packet}>
                <div className={s.price}>180 000 ТЕНГЕ</div>
                <div className={s.value}>2 номинация</div>
                <button onClick={() => payment(18000000)}>ПОПОЛНИТЬ</button>
            </div>
            <div className={s.packet}>
                <div className={s.price}>225 000 ТЕНГЕ</div>
                <div className={s.value}>3 номинация</div>
                <button onClick={() => payment(22500000)}>ПОПОЛНИТЬ</button>
            </div>
            <div className={s.packet}>
                <div className={s.price}>320 000 ТЕНГЕ</div>
                <div className={s.value}>4 номинация</div>
                <button onClick={() => payment(32000000)}>ПОПОЛНИТЬ</button>
            </div>

        </div>
        </div>
        <div className={s.questions}>
            <Questions/>
        </div>
    </div>
  )
}

export default PaymentPage