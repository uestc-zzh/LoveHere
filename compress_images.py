import os
from PIL import Image
import sys

# 设置照片目录和目标大小限制
photos_dir = os.path.join(os.getcwd(), 'images', 'photos')
MAX_SIZE_MB = 1.0
MAX_SIZE_BYTES = int(MAX_SIZE_MB * 1024 * 1024)

# 获取所有图片文件
def get_image_files(directory):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    image_files = []
    for file in os.listdir(directory):
        if any(file.lower().endswith(ext) for ext in image_extensions):
            image_files.append(os.path.join(directory, file))
    return image_files

# 获取文件大小
def get_file_size(file_path):
    return os.path.getsize(file_path)

# 压缩图片函数
def compress_image(file_path):
    original_size = get_file_size(file_path)
    # 如果文件已经小于限制，不需要压缩
    if original_size <= MAX_SIZE_BYTES:
        print(f"文件 {os.path.basename(file_path)} 已经小于 {MAX_SIZE_MB}MB，不需要压缩")
        return False
    
    # 打开图片
    image = Image.open(file_path)
    
    # 保存原始宽高比
    width, height = image.size
    
    # 计算压缩后的尺寸（先尝试缩小尺寸）
    scale = 0.9  # 每次缩小10%
    current_width, current_height = width, height
    
    # 先尝试通过调整尺寸来减小文件大小
    temp_image_path = file_path + '.temp.jpg'
    
    while True:
        # 计算新的尺寸
        new_width = int(current_width * scale)
        new_height = int(current_height * scale)
        
        # 如果尺寸已经太小，停止缩放
        if new_width < 800 or new_height < 600:
            break
        
        # 调整尺寸
        resized_image = image.resize((new_width, new_height), Image.LANCZOS)
        
        # 保存临时文件
        resized_image.save(temp_image_path, 'JPEG', quality=90, optimize=True)
        
        # 检查大小
        temp_size = get_file_size(temp_image_path)
        if temp_size <= MAX_SIZE_BYTES:
            image = resized_image
            current_width, current_height = new_width, new_height
            break
        
        current_width, current_height = new_width, new_height
    
    # 如果调整尺寸后仍然太大，尝试降低质量
    quality = 85
    while True:
        # 保存图片
        image.save(temp_image_path, 'JPEG', quality=quality, optimize=True)
        
        # 检查大小
        temp_size = get_file_size(temp_image_path)
        if temp_size <= MAX_SIZE_BYTES or quality <= 50:
            break
        
        quality -= 5
    
    # 用压缩后的文件替换原文件
    os.replace(temp_image_path, file_path)
    
    # 计算压缩率
    new_size = get_file_size(file_path)
    reduction = (original_size - new_size) / original_size * 100
    
    print(f"文件 {os.path.basename(file_path)} 已压缩:")
    print(f"  原始大小: {original_size/1024/1024:.2f}MB")
    print(f"  新大小: {new_size/1024/1024:.2f}MB")
    print(f"  减小: {reduction:.2f}%")
    return True

def main():
    # 检查目录是否存在
    if not os.path.exists(photos_dir):
        print(f"错误: 目录 {photos_dir} 不存在")
        return
    
    # 获取所有图片文件
    image_files = get_image_files(photos_dir)
    
    if not image_files:
        print(f"没有在 {photos_dir} 找到图片文件")
        return
    
    print(f"找到 {len(image_files)} 个图片文件需要检查压缩")
    compressed_count = 0
    
    # 压缩每个图片
    for file_path in image_files:
        if compress_image(file_path):
            compressed_count += 1
    
    print(f"\n压缩完成: {compressed_count} 个文件被压缩")

if __name__ == "__main__":
    # 检查是否已安装PIL库
    try:
        from PIL import Image
    except ImportError:
        print("请先安装PIL库: pip install pillow")
        sys.exit(1)
    
    main()