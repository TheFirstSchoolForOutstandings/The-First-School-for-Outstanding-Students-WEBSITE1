document.addEventListener('DOMContentLoaded', () => {
  // القائمة الجانبية للشاشات الصغيرة
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
  }

  // التبديل بين المرحلة الإعدادية والثانوية
  const levelBtns = document.querySelectorAll('.level-btn');
  const levelSections = document.querySelectorAll('.level-section');

  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      levelBtns.forEach(b => {
        b.classList.remove('bg-gold', 'text-dark');
        b.classList.add('bg-primary/50', 'text-white');
      });
      btn.classList.remove('bg-primary/50', 'text-white');
      btn.classList.add('bg-gold', 'text-dark');

      const targetId = btn.dataset.target;
      levelSections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    });
  });

  // التبديل بين المواد لعرض المدرسين
  const subjectBtns = document.querySelectorAll('.subject-btn');
  subjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentSection = btn.closest('.level-section');

      // إزالة التحديد والتنسيقات النشطة من بقية الأزرار
      parentSection.querySelectorAll('.subject-btn').forEach(b => {
        b.classList.remove('bg-gold', 'text-dark', 'scale-105');
        b.classList.add('bg-primary/40', 'text-gray-200');
      });

      // تطبيق التنسيق الذهبي النشط للزر المضغوط
      btn.classList.remove('bg-primary/40', 'text-gray-200');
      btn.classList.add('bg-gold', 'text-dark', 'scale-105');

      // إلغاء كتمان إشارة الـ focus على الموبايل لكي لا يثبت اللون الأخضر
      btn.blur();

      // إخفاء كل قوائم المدرسين وإظهار القائمة المطلوبة
      parentSection.querySelectorAll('.teachers-list').forEach(list => list.classList.add('hidden'));
      const targetTeacherList = document.getElementById(btn.dataset.target);
      if (targetTeacherList) {
        targetTeacherList.classList.remove('hidden');
      }
    });
  });

  // إغلاق النافذة المنبثقة للسيرة الذاتية
  const bioModal = document.getElementById('bio-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (closeModalBtn && bioModal) {
    closeModalBtn.addEventListener('click', () => {
      bioModal.classList.add('hidden');
    });

    // إغلاق عند النقر خارج المحتوى
    bioModal.addEventListener('click', (e) => {
      if (e.target === bioModal) {
        bioModal.classList.add('hidden');
      }
    });
  }

  // نموذج التواصل
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('form-success-msg').classList.remove('hidden');
      contactForm.reset();
    });
  }
});

// دالة إظهار السيرة الذاتية للمدرس
function showBio(name, subject, bio, exp, cert) {
  const modal = document.getElementById('bio-modal');
  if (!modal) return;

  document.getElementById('modal-teacher-name').textContent = name;
  document.getElementById('modal-teacher-subject').textContent = subject;
  document.getElementById('modal-teacher-bio').textContent = bio;
  document.getElementById('modal-teacher-exp').textContent = exp;
  document.getElementById('modal-teacher-cert').textContent = cert;

  modal.classList.remove('hidden');
}