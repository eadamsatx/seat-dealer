import random
import string


def generate_word(length=10):
    character_set = string.ascii_letters + string.digits
    return ''.join(random.choice(character_set) for _ in range(length))
