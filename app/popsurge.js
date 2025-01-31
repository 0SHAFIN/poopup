        // popsurge.js - One-Time Purchase Popup Solution
        (() => {
            const style = `.popsurge-container {
                position: fixed;
                z-index: 2147483647;
                top: 1rem;
                right: 1rem;
                max-width: 350px;
                width: 90%;
                user-select: none;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .popsurge-toast {
                background: #ffffff;
                border-radius: 12px;
                padding: 16px;
                margin: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out;
                display: flex;
                gap: 12px;
                align-items: start;
                border: 1px solid #e5e7eb;
            }

            .toast-hide {
                animation: fadeOut 0.3s forwards;
            }

            @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            @keyframes fadeOut {
                to { opacity: 0; }
            }`;

            // Configuration
            const config = {
                waitFor: 2000,
                toastEvery: 2000,
                toastDuration: 8000,
                maxDisplays: 6,
                closeButton: true,
                messages: [
                    {"title":"Test 1","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                    {"title":"Test 2","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                    {"title":"Test 3","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                    {"title":"Test 4","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                    {"title":"Test 5","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                    {"title":"Test 6","body":"First message","icon":"https://d3m8mk7e1mf7xn.cloudfront.net/64224402d24ae443b84e744a/1700208280014icon.png"},
                ]
            };

            let displayCount = 0;

            const init = () => {
                // Create style element
                const styleEl = document.createElement('style');
                styleEl.textContent = style;
                document.head.appendChild(styleEl);

                // Create container
                const container = document.createElement('div');
                container.className = 'popsurge-container';
                document.body.appendChild(container);

                // Start display sequence
                setTimeout(showNextMessage, config.waitFor);
            };

            const showNextMessage = () => {
                if (displayCount >= config.maxDisplays) return;
                
                const message = config.messages[displayCount % config.messages.length];
                if (!message) return;

                const toast = createToast(message);
                document.querySelector('.popsurge-container').appendChild(toast);
                
                displayCount++;
                setTimeout(() => toast.classList.add('toast-hide'), config.toastDuration);
                setTimeout(() => toast.remove(), config.toastDuration + 300);

                if (displayCount < config.maxDisplays) {
                    setTimeout(showNextMessage, config.toastEvery);
                }
            };

            const createToast = (message) => {
                const toast = document.createElement('div');
                toast.className = 'popsurge-toast';
                
                toast.innerHTML = `
                    ${message.icon ? `<img src="${message.icon}" width="40" height="40" style="border-radius:8px">` : ''}
                    <div style="flex:1">
                        <div style="font-weight:600;margin-bottom:4px">${message.title}</div>
                        <div style="color:#4b5563;font-size:0.9em">${message.body}</div>
                    </div>
                    ${config.closeButton ? 
                        `<button style="margin-left:8px;cursor:pointer;background:none;border:0;padding:0" 
                                onclick="this.parentElement.classList.add('toast-hide')">×</button>` : ''}
                `;

                if (message.link) {
                    toast.style.cursor = 'pointer';
                    toast.querySelector('div').addEventListener('click', () => {
                        window.open(message.link, '_blank');
                    });
                }

                return toast;
            };

            // Start when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();