
import random
from captcha.audio import AudioCaptcha

def generate_random_captcha (length=6):
    characters =     '1234567890'
    captcha_text = ''.join(random. choices (characters, k=length))
    with open(r"captcha.txt", "w", encoding='utf-8') as file:
        file.write(captcha_text)

    return captcha_text
    
audio = AudioCaptcha()
captcha_text = generate_random_captcha()
print("Generated CAPTCHA text: ", captcha_text)

audio_captcha = audio.generate (captcha_text)
audio.write(captcha_text, 'Audio_Captcha.wav')
print("Audio CAPTCHA generated: Audio_Captcha.wav")
